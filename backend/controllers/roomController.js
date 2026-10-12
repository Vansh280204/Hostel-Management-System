const roomService = require('../services/roomService');

//Create Room
const createRoom = async (req,res) => {
    try{
        const room = await roomService.createRoom(req.body, req.user?.id);
        res.status(201).json(room);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

const getMyRoom = async (req, res) => {
    try {

        const room = await Room.findOne({
            userId: req.user.id
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "No room assigned"
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//Get All Room
const getAllRoom = async (req,res) => {
    try{
        const room = await roomService.getAllRoom();
        res.status(200).json(room);
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//Get Room by Room Number
const getByNumber = async (req,res) => {
    try{
        const room = await roomService.getByNumber(req.params.number);
        res.status(200).json(room);
    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
};

//Update Room By Number
const updateByNumber = async (req,res) => {
    try{
        const room = await roomService.updateByNumber(req.params.number,req.body);
        res.status(200).json(room);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Delete By Number
const deleteByNumber = async (req,res) => {
    try{
        const room = await roomService.deleteByNumber(req.params.number);
        res.status(200).json(room);
    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
};

//Change Status of Room by Number
const changeStatusByNumber = async (req,res) => {
    try{
        const room = await roomService.changeStatusByNumber(req.params.number);
        res.status(200).json(room)
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createRoom, getMyRoom, getAllRoom, getByNumber, updateByNumber, deleteByNumber, changeStatusByNumber};