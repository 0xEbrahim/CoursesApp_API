let Course = require('../model/coursesModel')
const {validationResult } = require('express-validator')


const deleteCourse = async (req, res)=>{
  try {
    const response = await Course.deleteOne({_id : req.params.id});
    res.status(200).json({success : true, msg : response })
   }
   catch(err){
    res.send({error: err});
   }
}

const addCourse = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json(errors.array());

    }

   const newCourse  =  new Course(req.body);

   await newCourse.save();

   res.sendStatus(201)
 }

const updateCourse = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
    return res.status(400).json(result.array())
    }
    try {
        await Course.updateOne({_id : req.params.id}, {$set: {...req.body}});
       res.sendStatus(201);
     } catch(err) {
         return res.status(400).json({error : err})
     }
}

const getAllCourses =async (req, res) => {
    const courses = await Course.find();
    res.json({courses});
}

const getSingleCourse = async (req, res) => {
    try {
   const course  = await Course.findById(req.params.id);
    if(course){
       return res.json(course);
    }else{
       return res.status(404).json({msg : "Course not found"})
    }

} catch(err) {
    return res.status(400).json({msg : "Invalid object ID"})
}
}

module.exports = {
    getSingleCourse,
    updateCourse,
    addCourse,
    deleteCourse,
    getAllCourses
}