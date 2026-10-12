const bookingService = require('../services/bookingService');

//Create Booking
const createBooking = async (req,res) => {
    try{
        const booking = await bookingService.createBooking(req.body);
        console.log(booking);
        res.status(201).json(booking);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Cancel Booking
const cancelBooking = async (req,res) => {
    try{
        const booking = await bookingService.cancelBooking(req.params.bookingId,req.user.id);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get My Booking(For User)
const getMyBooking = async (req,res) => {
    try{
        const booking = await bookingService.getMyBooking(req.user.id);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({
        success:false,
        message:error.message
        });
    }
};

//Get All Bookings(for Admin)
const getAllBookings = async (req,res) => {
    try{
        const bookings = await bookingService.getAllBookings(req.query);
        res.status(200).json(bookings);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get Admin Dashboard Stats
const getDashboardStats = async (req, res) => {
    try {
        const result = await bookingService.getDashboardStats();

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Get Booking By Id(For Both)
const getById = async (req,res) => {
    try{
        const booking = await bookingService.getById(req.params.bookingId);
        res.status(200).json(booking);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Update Booking By Id
const updateById = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(
            req.params.bookingId,
            req.body,
            req.user.id,
            req.user.role
        );

        res.status(200).json(booking);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {createBooking, cancelBooking, getMyBooking, getAllBookings, getDashboardStats, getById, updateById};
