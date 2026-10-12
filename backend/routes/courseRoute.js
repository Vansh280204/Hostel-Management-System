const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const {verifyToken, isAdmin} = require('../middleware/authMiddleware');

//Create Course
router.post('/', verifyToken, isAdmin, courseController.createCourse);

//Get All Course
router.get('/',verifyToken,isAdmin, courseController.getAllCourse);

//Get Course By Name
router.get('/:name',verifyToken, isAdmin, courseController.getByName);

//Update Course By Name
router.put('/:name', verifyToken, isAdmin, courseController.updateByName);

//Delete Course By Name
router.delete('/:name', verifyToken, isAdmin, courseController.deleteByName);

//Change Status By Name
router.patch('/:name', verifyToken, isAdmin, courseController.changeStatusByName);

module.exports = router;