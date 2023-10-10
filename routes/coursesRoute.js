const express = require('express');
const {validationSchema} = require('../middlewares/validationSchema')
const router = express.Router();
const {addCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
    } = require('../controllers/coursesController')

router.route('/')
        .get(getAllCourses)
        .post(validationSchema(),addCourse)


router.route('/:id')
        .get(getSingleCourse )
        .patch(validationSchema() ,updateCourse)
    .delete(deleteCourse)

module.exports = router