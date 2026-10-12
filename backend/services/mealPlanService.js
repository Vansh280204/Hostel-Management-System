const MealPlan = require('../models/mealPlanModel');

const mealPlanService = {

    // Create Meal Plan
    createMealPlan: async (data) => {
        try {
            const {
                planName,
                type,
                price,
                mealsPerDay,
                description
            } = data;

            if (
                !planName?.trim() ||
                !type ||
                price === undefined ||
                price === "" ||
                mealsPerDay === undefined ||
                mealsPerDay === ""
            ) {
                throw new Error("Please provide all required fields");
            }

            const validTypes = [
                "Breakfast",
                "Lunch",
                "Dinner",
                "Full Day"
            ];

            if (!validTypes.includes(type)) {
                throw new Error("Invalid meal plan type");
            }

            const numericPrice = Number(price);
            const numericMealsPerDay = Number(mealsPerDay);

            if (!Number.isFinite(numericPrice) || numericPrice < 0) {
                throw new Error("Price must be a valid non-negative number");
            }

            if (
                !Number.isInteger(numericMealsPerDay) ||
                numericMealsPerDay < 1
            ) {
                throw new Error("Meals per day must be a positive integer");
            }

            const mealPlan = await MealPlan.create({
                planName: planName.trim(),
                type,
                price: numericPrice,
                mealsPerDay: numericMealsPerDay,
                description: description?.trim() || ""
            });

            return {
                success: true,
                message: "Meal Plan Created Successfully",
                data: mealPlan
            };

        } catch (error) {
            throw new Error(`Error While Creating Meal Plan: ${error.message}`);
        }
    },


    // Get All Meal Plans
    getAllMealPlans: async () => {
        try {
            const mealPlans = await MealPlan.find().sort({ createdAt: -1 });

            return {
                success: true,
                message: "Meal Plans Fetched Successfully",
                data: mealPlans
            };

        } catch (error) {
            throw new Error(`Error While Fetching Meal Plans: ${error.message}`);
        }
    },


    // Get Meal Plan By ID
    getMealPlanById: async (id) => {
        try {
            if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error("Invalid Meal Plan ID");
            }

            const mealPlan = await MealPlan.findById(id);

            if (!mealPlan) {
                throw new Error("Meal Plan Not Found");
            }

            return {
                success: true,
                message: "Meal Plan Fetched Successfully",
                data: mealPlan
            };

        } catch (error) {
            throw new Error(`Error While Fetching Meal Plan: ${error.message}`);
        }
    },


    // Update Meal Plan
    updateMealPlan: async (id, data) => {
        try {
            if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error("Invalid Meal Plan ID");
            }

            const allowedFields = [
                "planName",
                "type",
                "price",
                "mealsPerDay",
                "description"
            ];

            const updateData = {};

            for (const field of allowedFields) {
                if (data[field] !== undefined) {
                    updateData[field] = data[field];
                }
            }

            if (Object.keys(updateData).length === 0) {
                throw new Error("No valid fields provided for update");
            }

            if (updateData.planName !== undefined) {
                if (
                    typeof updateData.planName !== "string" ||
                    !updateData.planName.trim()
                ) {
                    throw new Error("Plan name cannot be empty");
                }

                updateData.planName = updateData.planName.trim();
            }

            if (updateData.type !== undefined) {
                const validTypes = [
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Full Day"
                ];

                if (!validTypes.includes(updateData.type)) {
                    throw new Error("Invalid meal plan type");
                }
            }

            if (updateData.price !== undefined) {
                updateData.price = Number(updateData.price);

                if (
                    !Number.isFinite(updateData.price) ||
                    updateData.price < 0
                ) {
                    throw new Error("Price must be a valid non-negative number");
                }
            }

            if (updateData.mealsPerDay !== undefined) {
                updateData.mealsPerDay = Number(updateData.mealsPerDay);

                if (
                    !Number.isInteger(updateData.mealsPerDay) ||
                    updateData.mealsPerDay < 1
                ) {
                    throw new Error("Meals per day must be a positive integer");
                }
            }

            if (updateData.description !== undefined) {
                if (typeof updateData.description !== "string") {
                    throw new Error("Description must be text");
                }

                updateData.description = updateData.description.trim();
            }

            const mealPlan = await MealPlan.findByIdAndUpdate(
                id,
                { $set: updateData },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!mealPlan) {
                throw new Error("Meal Plan Not Found");
            }

            return {
                success: true,
                message: "Meal Plan Updated Successfully",
                data: mealPlan
            };

        } catch (error) {
            throw new Error(`Error While Updating Meal Plan: ${error.message}`);
        }
    },


    // Activate / Deactivate Meal Plan
    changeMealPlanStatus: async (id, isActive) => {
        try {
            if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error("Invalid Meal Plan ID");
            }

            if (typeof isActive !== "boolean") {
                throw new Error("isActive must be true or false");
            }

            const mealPlan = await MealPlan.findByIdAndUpdate(
                id,
                { $set: { isActive } },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!mealPlan) {
                throw new Error("Meal Plan Not Found");
            }

            return {
                success: true,
                message: "Meal Plan Status Changed Successfully",
                data: mealPlan
            };

        } catch (error) {
            throw new Error(`Error While Changing Meal Plan Status: ${error.message}`);
        }
    },


    // Delete Meal Plan
    deleteMealPlan: async (id) => {
        try {
            if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error("Invalid Meal Plan ID");
            }

            const mealPlan = await MealPlan.findByIdAndDelete(id);

            if (!mealPlan) {
                throw new Error("Meal Plan Not Found");
            }

            return {
                success: true,
                message: "Meal Plan Deleted Successfully"
            };

        } catch (error) {
            throw new Error(`Error While Deleting Meal Plan: ${error.message}`);
        }
    }

};

module.exports = mealPlanService;