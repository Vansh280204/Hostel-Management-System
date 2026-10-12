const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema(
    {
        planName:{type:String, required:true, trim:true},

        type:{type:String, enum:["Breakfast", "Lunch", "Dinner", "Full Day"], required:true},

        price:{type:Number, required:true, min:0},

        mealsPerDay:{type:Number, required:true, min:1},

        description:{type:String, trim:true},

        isActive:{type:Boolean, default:true}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("MealPlan",mealPlanSchema);