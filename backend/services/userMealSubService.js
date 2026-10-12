const UserMealSub = require('../models/userMealSub');
const User = require('../models/userModel');
const MealPlan = require('../models/mealPlanModel');

const userMealSubService = {

    // ==========================
    // Assign Meal Plan
    // ==========================

    assignMealPlan: async (data) => {

        try {

            const {
                userId,
                mealPlanId,
                startDate,
                endDate
            } = data;

            // ==========================
            // Required Fields
            // ==========================

            if (!userId || !mealPlanId || !startDate || !endDate) {
                throw new Error("Please provide all required fields");
            }


            // ==========================
            // Find Student
            // ==========================

            const student = await User.findOne({
                userId: userId,
                role: "student"
            });

            if (!student) {
                throw new Error("Student Not Found");
            }

            if (!student.isActive) {
                throw new Error("Student is inactive");
            }


            // ==========================
            // Find Meal Plan
            // ==========================

            const mealPlan = await MealPlan.findById(mealPlanId);

            if (!mealPlan) {
                throw new Error("Meal Plan Not Found");
            }

            if (!mealPlan.isActive) {
                throw new Error("Meal Plan is inactive");
            }


            // ==========================
            // Validate Dates
            // ==========================

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (
                isNaN(start.getTime()) ||
                isNaN(end.getTime())
            ) {
                throw new Error("Invalid date");
            }

            if (end <= start) {
                throw new Error(
                    "End date must be greater than start date"
                );
            }


            // ==================================================
            // Check For Overlapping Subscription
            // ==================================================

            const existingSubscription = await UserMealSub.findOne({

                userId: student._id,

                status: "Active",

                // Existing subscription starts
                // before or on the new subscription's end
                startDate: {
                    $lte: end
                },

                // Existing subscription ends
                // after or on the new subscription's start
                endDate: {
                    $gte: start
                }
            });


            if (existingSubscription) {

                throw new Error(
                    "Student already has a meal subscription during this period"
                );
            }


            // ==========================
            // Create Subscription
            // ==========================

            const subscription = await UserMealSub.create({

                userId: student._id,

                mealPlanId: mealPlan._id,

                startDate: start,

                endDate: end,

                status: "Active"
            });


            return {

                success: true,

                message: "Meal Plan Assigned Successfully",

                data: subscription
            };

        } catch (error) {

            throw new Error(
                `Error While Assigning Meal Plan: ${error.message}`
            );
        }
    },


    // ==========================
    // Get All Subscriptions
    // ==========================

    getAllSubscriptions: async () => {

        try {

            const subscriptions = await UserMealSub.find()

                .populate({
                    path: "userId",
                    select: "userId name email phone"
                })

                .populate("mealPlanId")

                .sort({
                    createdAt: -1
                });


            return {

                success: true,

                message:
                    "Meal Subscriptions Fetched Successfully",

                data: subscriptions
            };

        } catch (error) {

            throw new Error(
                `Error While Fetching Meal Subscriptions: ${error.message}`
            );
        }
    },


    // ==========================
    // Get Student Subscription
    // ==========================

    getStudentSubscription: async (userId) => {

        try {

            const student = await User.findOne({
                userId: userId,
                role: "student"
            });

            if (!student) {
                throw new Error("Student Not Found");
            }


            const subscriptions = await UserMealSub.find({
                userId: student._id
            })

                .populate("mealPlanId")

                .populate({
                    path: "userId",
                    select: "userId name email"
                })

                .sort({
                    startDate: -1
                });


            if (!subscriptions.length) {

                throw new Error(
                    "No Meal Plan Assigned To This Student"
                );
            }


            return {

                success: true,

                message:
                    "Student Meal Plans Fetched Successfully",

                data: subscriptions
            };

        } catch (error) {

            throw new Error(
                `Error While Fetching Student Meal Plans: ${error.message}`
            );
        }
    },


    // ==========================
    // Update Subscription
    // ==========================

    updateSubscription: async (id, data) => {

        try {

            const subscription =
                await UserMealSub.findById(id);

            if (!subscription) {
                throw new Error("Subscription Not Found");
            }


            const {
                mealPlanId,
                startDate,
                endDate
            } = data;


            // ==========================
            // Prepare New Dates
            // ==========================

            const newStartDate =
                startDate
                    ? new Date(startDate)
                    : subscription.startDate;

            const newEndDate =
                endDate
                    ? new Date(endDate)
                    : subscription.endDate;


            if (
                isNaN(newStartDate.getTime()) ||
                isNaN(newEndDate.getTime())
            ) {
                throw new Error("Invalid date");
            }


            if (newEndDate <= newStartDate) {

                throw new Error(
                    "End date must be greater than start date"
                );
            }


            // ==========================
            // Update Meal Plan
            // ==========================

            if (mealPlanId) {

                const mealPlan =
                    await MealPlan.findById(mealPlanId);

                if (!mealPlan) {
                    throw new Error("Meal Plan Not Found");
                }

                if (!mealPlan.isActive) {
                    throw new Error("Meal Plan is inactive");
                }

                subscription.mealPlanId = mealPlanId;
            }


            // ==================================================
            // Check Overlap With Other Subscriptions
            // ==================================================

            if (subscription.status === "Active") {

                const overlappingSubscription =
                    await UserMealSub.findOne({

                        _id: {
                            $ne: subscription._id
                        },

                        userId: subscription.userId,

                        status: "Active",

                        startDate: {
                            $lte: newEndDate
                        },

                        endDate: {
                            $gte: newStartDate
                        }
                    });


                if (overlappingSubscription) {

                    throw new Error(
                        "Updated subscription period overlaps with another meal subscription"
                    );
                }
            }


            // ==========================
            // Set Dates
            // ==========================

            subscription.startDate = newStartDate;

            subscription.endDate = newEndDate;


            await subscription.save();


            return {

                success: true,

                message:
                    "Meal Subscription Updated Successfully",

                data: subscription
            };

        } catch (error) {

            throw new Error(
                `Error While Updating Meal Subscription: ${error.message}`
            );
        }
    },


    // ==========================
    // Cancel Subscription
    // ==========================

    cancelSubscription: async (id) => {

        try {

            const subscription =
                await UserMealSub.findById(id);

            if (!subscription) {
                throw new Error("Subscription Not Found");
            }


            if (subscription.status === "Cancelled") {

                throw new Error(
                    "Meal Subscription is already cancelled"
                );
            }


            subscription.status = "Cancelled";

            await subscription.save();


            return {

                success: true,

                message:
                    "Meal Subscription Cancelled Successfully",

                data: subscription
            };

        } catch (error) {

            throw new Error(
                `Error While Cancelling Meal Subscription: ${error.message}`
            );
        }
    },
    
    getMySubscription: async (userId) => {
        try {
            const subscription = await MealSubscription.findOne({
                userId,
                status: "active"
            })
            .populate("mealPlanId");
    
            if (!subscription) {
                throw new Error("No Active Meal Subscription Found");
            }
    
            return {
                success: true,
                message: "Meal Subscription Retrieved Successfully",
                data: subscription
            };
    
        } catch (error) {
            throw new Error(
                `Error While Retrieving Meal Subscription: ${error.message}`
            );
        }
    },

};


module.exports = userMealSubService;