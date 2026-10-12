const express = require("express");
const router = express.Router();
const roomController = require('../controllers/roomController');
const {verifyToken, isAdmin} = require('../middleware/authMiddleware');

//Create Room
router.post('/', verifyToken, isAdmin, roomController.createRoom);

//Get All Room
router.get('/', verifyToken, isAdmin, roomController.getAllRoom);

// Get Room Assigned To Logged-in Student
router.get(
    '/my-room',
    verifyToken,
    roomController.getMyRoom
);

//Get By Number
router.get('/:number',verifyToken, isAdmin, roomController.getByNumber);

//Update Room By Number
router.put('/:number', verifyToken, isAdmin, roomController.updateByNumber);

//Delete Room by Numebr
router.delete('/:number', verifyToken, isAdmin, roomController.deleteByNumber);

//Change the Status of Room
router.patch('/:number', verifyToken, isAdmin, roomController.changeStatusByNumber);

module.exports = router;
