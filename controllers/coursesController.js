let Course = require('../model/coursesModel')
const {validationResult } = require('express-validator')
const {
    SUCCESS ,
     FAIL , 
     ERROR
    } = require("../utils/httpStatusText")
const asyncWrapper = require('../middlewares/asyncWrapper')
const AppError= require('../utils/error')



const deleteCourse = asyncWrapper(async (req, res)=>{
    await Course.deleteOne({_id : req.params.id});
    res.status(200).json({status : SUCCESS, data : null})
}
)
const addCourse = asyncWrapper( async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = AppError.create(errors.array(), 400 ,FAIL)
        return next(error)
    }

   const newCourse  =  new Course(req.body);
   await newCourse.save();
   res.status(201).send({status : SUCCESS,data : {course : newCourse}})
 })

const updateCourse = asyncWrapper(async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = AppError.create(result.array(), 400, FAIL)
        return next(error);
    }
    const updatedCourse = await Course.updateOne({_id : req.params.id}, {$set: {...req.body}});
    return res.status(200).send({status : SUCCESS , data : {updatedCourse}});
} )

const getAllCourses =asyncWrapper(
    async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const courses = await Course.find({}, {"__v" : false}).limit(limit).skip(( page - 1 ) * limit);
    res.json({status : SUCCESS, data : {courses}});
    }
)

const getSingleCourse = asyncWrapper(async (req, res, next) => {
   const course  = await Course.findById(req.params.id);
    if(course){
       return res.json({status : SUCCESS , data : {course}});
    }else{
        const error = AppError.create("Course not found.", 404 ,FAIL)
        return next(error)
        }
    }
)

module.exports = {
    getSingleCourse,
    updateCourse,
    addCourse,
    deleteCourse,
    getAllCourses
}