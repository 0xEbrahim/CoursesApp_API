const express = require('express');
const {coursesValidationSchema} = require('../middlewares/validationSchema')
const router = express.Router();
const {addCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
    } = require('../controllers/coursesController')

router.route('/')
        .get(getAllCourses)
        .post(coursesValidationSchema(),addCourse)


router.route('/:id')
        .get(getSingleCourse )
        .patch(coursesValidationSchema() ,updateCourse)
    .delete(deleteCourse)

module.exports = router