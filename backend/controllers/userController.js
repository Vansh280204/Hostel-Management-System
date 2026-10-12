const userService = require('../services/userService');
const User = require('../models/userModel');

// Create Student
const createStudent = async (req, res) => {
    try {
        const student = await userService.createStudent(
            req.body,
            req.user.id
        );

        res.status(201).json(student);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getMyProfile = async (req, res) => {
    try {

        // console.log(req.user.id);
        const user = await User.findById(req.user.id)
            .populate('courseId');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Get All Students
const getAllStudent = async (req, res) => {
    try {
        const students = await userService.getAllStudent();

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Student By ID
const getById = async (req, res) => {
    try {
        const student = await userService.getById(req.params.id);

        res.status(200).json(student);

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Get Student By Name
const getByName = async (req, res) => {
    try {
        const student = await userService.getByName(req.params.name);

        res.status(200).json(student);

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Update Student By ID
const updateById = async (req, res) => {
    try {
        const student = await userService.updateById(
            req.params.id,
            req.body
        );

        res.status(200).json(student);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Student By ID
const deleteById = async (req, res) => {
    try {
        const student = await userService.deleteById(req.params.id);

        res.status(200).json(student);

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Status Change By ID
const statusChangeById = async (req, res) => {
    try {
        const student = await userService.statusChangeById(
            req.params.id,
            req.body.isActive
        );

        res.status(200).json(student);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createStudent,
    getAllStudent,
    getById,
    getByName,
    updateById,
    deleteById,
    statusChangeById,
    getMyProfile
};