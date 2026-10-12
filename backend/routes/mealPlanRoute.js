const express = require('express');
const router = express.Router();

const mealPlanController = require('../controllers/mealPlanController');

const {
    verifyToken,
    isAdmin
} = require('../middleware/authMiddleware');

// Create Meal Plan
router.post(
    '/',
    verifyToken,
    isAdmin,
    mealPlanController.createMealPlan
);

// Get All Meal Plans
router.get(
    '/',
    verifyToken,
    isAdmin,
    mealPlanController.getAllMealPlans
);

// Change Status - keep before /:id
router.patch(
    '/status/:id',
    verifyToken,
    isAdmin,
    mealPlanController.changeMealPlanStatus
);

// Get Meal Plan By ID
router.get(
    '/:id',
    verifyToken,
    isAdmin,
    mealPlanController.getMealPlanById
);

// Update Meal Plan
router.put(
    '/:id',
    verifyToken,
    isAdmin,
    mealPlanController.updateMealPlan
);

// Delete Meal Plan
router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    mealPlanController.deleteMealPlan
);

module.exports = router;