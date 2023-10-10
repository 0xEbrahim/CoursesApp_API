let { courses } = require('../data/courses')
const {validationResult } = require('express-validator')
const deleteCourse = (req, res)=>{
    const courseId = +req.params.id;
    courses = courses.filter((el)=>el.id!==courseId);
    res.status(200).json(courses);
}

const addCourse = (req, res) => {

    const {title,price} = req.body;
    const result = validationResult(req);
 
    if(!result.isEmpty()){
     return res.status(400).json(result.array())
    }
 
    const course = {id:courses.length + 1 , title , price}
    courses.push({id:courses.length + 1 , title , price});
    res.json({course});
 }

const updateCourse = (req, res) => {
    const courseId = +req.params.id;
    const result = validationResult(req);
    let course = courses.find((el)=>el.id == courseId);
    if(!result.isEmpty()){
    return res.status(400).json(result.array())
    }
    if(!course){
    return res.status(400).json({msg : "course not found"})
    }
    course = {...course, ...req.body};
    res.status(200).json(course);
   
}

const getAllCourses = (req, res) => {
    res.json({courses : courses});
}

const getSingleCourse = (req, res) => {
    const id = +req.params.id;
    const course = courses.find(( el ) => el.id === id );
    if(course){
        res.json({course : course});
    }else{
       return res.status(404).json({msg : "Course no found or valid id."})
    }
}

module.exports = {
    getSingleCourse,
    updateCourse,
    addCourse,
    deleteCourse,
    getAllCourses
}