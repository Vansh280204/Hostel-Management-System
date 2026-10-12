const userMealSubService = require('../services/userMealSubService');


// Assign Meal Plan
const assignMealPlan = async (req, res) => {

    try {

        const result =
            await userMealSubService.assignMealPlan(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Subscriptions
const getAllSubscriptions = async (req, res) => {

    try {

        const result =
            await userMealSubService.getAllSubscriptions();

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Student Subscription
const getStudentSubscription = async (req, res) => {

    try {

        const result =
            await userMealSubService.getStudentSubscription(
                req.params.userId
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Subscription
const updateSubscription = async (req, res) => {

    try {

        const result =
            await userMealSubService.updateSubscription(
                req.params.id,
                req.body
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Cancel Subscription
const cancelSubscription = async (req, res) => {

    try {

        const result =
            await userMealSubService.cancelSubscription(
                req.params.id
            );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getMySubscription = async (req, res) => {
    try {
        const subscription =
            await mealSubscriptionService.getMySubscription(req.user.id);

        res.status(200).json(subscription);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getMySubscription,
    assignMealPlan,
    getAllSubscriptions,
    getStudentSubscription,
    updateSubscription,
    cancelSubscription
};