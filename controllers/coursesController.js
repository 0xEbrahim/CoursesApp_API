let Course = require('../model/coursesModel')
const {validationResult } = require('express-validator')
const {
    SUCCESS ,
     FAIL , 
     ERROR
    } = require("../utils/httpStatusText")

const deleteCourse = async (req, res)=>{
  try {
    await Course.deleteOne({_id : req.params.id});
    res.status(200).json({status : SUCCESS, data : null})
   }
   catch(err){
    res.send({error: err});
   }
}

const addCourse = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({status : FAIL , data :errors.array()});
    }

   const newCourse  =  new Course(req.body);

   await newCourse.save();

   res.status(201).send({status : SUCCESS,course : {newCourse}})
 }

const updateCourse = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
    return res.status(400).json({status : FAIL , data :result.array()})
    }
    try {
       const updatedCourse = await Course.updateOne({_id : req.params.id}, {$set: {...req.body}});
       return res.status(200).send({status : SUCCESS , course : {updatedCourse}});
     } catch(err) {
         return res.status(400).json({status : ERROR , message :err.message,code : 400})
     }
} 

const getAllCourses =async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const courses = await Course.find({}, {"__v" : false}).limit(limit).skip(( page - 1 ) * limit);
    res.json({status : SUCCESS, data : {courses}});
}

const getSingleCourse = async (req, res) => {
    try {
   const course  = await Course.findById(req.params.id);
    if(course){
       return res.json({status : SUCCESS,data : {course}});
    }else{
       return res.status(404).json({status : FAIL, data : {course: "Course not found."}})
    }

} catch(err) {
    return res.status(400).json({status : ERROR , message : err.message, code : 400})
}
}

module.exports = {
    getSingleCourse,
    updateCourse,
    addCourse,
    deleteCourse,
    getAllCourses
}