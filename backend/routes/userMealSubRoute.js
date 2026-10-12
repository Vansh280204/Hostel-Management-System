const express = require('express');

const router = express.Router();

const userMealSubController =
    require('../controllers/userMealSubController');

const {
    verifyToken,
    isAdmin
} = require('../middleware/authMiddleware');


// Assign Meal Plan
router.post(
    '/',
    verifyToken,
    isAdmin,
    userMealSubController.assignMealPlan
);


// Get All Meal Subscriptions
router.get(
    '/',
    verifyToken,
    isAdmin,
    userMealSubController.getAllSubscriptions
);


// Get Student Meal Subscription
router.get(
    '/student/:userId',
    verifyToken,
    isAdmin,
    userMealSubController.getStudentSubscription
);


// Update Subscription
router.put(
    '/:id',
    verifyToken,
    isAdmin,
    userMealSubController.updateSubscription
);


// Cancel Subscription
router.patch(
    '/:id/cancel',
    verifyToken,
    isAdmin,
    userMealSubController.cancelSubscription
);

router.get(
    '/my-subscription',
    verifyToken,
    userMealSubController.getMySubscription
);


module.exports = router;