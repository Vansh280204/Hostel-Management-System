const mealPlanService = require('../services/mealPlanService');

// Create Meal Plan
const createMealPlan = async (req, res) => {
    try {
        const result = await mealPlanService.createMealPlan(req.body);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Meal Plans
const getAllMealPlans = async (req, res) => {
    try {
        const result = await mealPlanService.getAllMealPlans();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Meal Plan By ID
const getMealPlanById = async (req, res) => {
    try {
        const result = await mealPlanService.getMealPlanById(req.params.id);

        return res.status(200).json(result);

    } catch (error) {
        const statusCode = error.message.includes("Not Found") ? 404 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// Update Meal Plan
const updateMealPlan = async (req, res) => {
    try {
        const result = await mealPlanService.updateMealPlan(
            req.params.id,
            req.body
        );

        return res.status(200).json(result);

    } catch (error) {
        const statusCode = error.message.includes("Not Found") ? 404 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// Change Meal Plan Status
const changeMealPlanStatus = async (req, res) => {
    try {
        const result = await mealPlanService.changeMealPlanStatus(
            req.params.id,
            req.body.isActive
        );

        return res.status(200).json(result);

    } catch (error) {
        const statusCode = error.message.includes("Not Found") ? 404 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Meal Plan
const deleteMealPlan = async (req, res) => {
    try {
        const result = await mealPlanService.deleteMealPlan(req.params.id);

        return res.status(200).json(result);

    } catch (error) {
        const statusCode = error.message.includes("Not Found") ? 404 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createMealPlan,
    getAllMealPlans,
    getMealPlanById,
    updateMealPlan,
    changeMealPlanStatus,
    deleteMealPlan
};