const courseService = require('../services/courseService');

//Create Course
const createCourse = async (req,res) => {
    try{
        const course = await courseService.createCourse(req.body,req.user?.id);
        res.status(201).json(course);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Get All Course
const getAllCourse = async (req,res) => {
    try{
        const course = await courseService.getAllCourse();
        res.status(200).json(course);
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


//Get Course By Name
const getByName = async (req,res) => {
    try{
        const course = await courseService.getByName(req.params.name);
        res.status(200).json(course);
    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
};

//Update By Name
const updateByName = async (req,res) => {
    try{
        const course = await courseService.updateByName(req.params.name,req.body);
        res.status(200).json(course);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

//Delete Course By Name
const deleteByName = async (req,res) => {
    try{
        const course = await courseService.deleteByName(req.params.name);
        res.status(200).json(course);
    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
};

//Status Change by Name
const changeStatusByName = async (req,res) => {
    try{
        const course = await courseService.changeStatusByName(req.params.name,req.body.isActive);
        res.status(200).json(course);
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {createCourse, getAllCourse, getByName, updateByName, deleteByName, changeStatusByName};