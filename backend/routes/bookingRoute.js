const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {verifyToken,isAdmin} = require('../middleware/authMiddleware');

//Create Booking
router.post('/', verifyToken, bookingController.createBooking);

//Cancel Booking
router.patch('/:bookingId/cancel', verifyToken, bookingController.cancelBooking);

//Get My Booking(For User)
router.get('/my-booking', verifyToken, bookingController.getMyBooking);

//Get All Bookings(For Admin)
router.get('/all-bookings', verifyToken, isAdmin, bookingController.getAllBookings);

//Get Admin Dashboard Stats
router.get('/admin/stats', verifyToken, isAdmin,bookingController.getDashboardStats);

//Get Booking By Id(For Both)
router.get('/:bookingId', verifyToken, bookingController.getById);

//Update Booking By Id
router.put('/:bookingId', verifyToken, bookingController.updateById);

module.exports = router;