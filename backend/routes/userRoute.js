const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyToken,isAdmin} = require('../middleware/authMiddleware');

//Create Student
router.post('/',verifyToken,isAdmin,userController.createStudent);

//Get All Student
router.get('/',verifyToken,isAdmin,userController.getAllStudent);

//Get Student By Name
router.get('/search/:name', verifyToken,isAdmin,userController.getByName);

router.get(
    '/me',
    verifyToken,
    userController.getMyProfile
);

//Get Student By Id
router.get('/:id', verifyToken,isAdmin,userController.getById);

//Update Student By Id
router.put('/:id',verifyToken,isAdmin,userController.updateById);

//Delete Student By Id
router.delete('/:id',verifyToken,isAdmin,userController.deleteById);

//Status Change by Id
router.patch('/status/:id',verifyToken, isAdmin,userController.statusChangeById);

module.exports = router;