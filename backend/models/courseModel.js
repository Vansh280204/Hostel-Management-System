const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseName:{type:String, required:true, unique:true},

        duration:{type:String, required:true},

        isActive: {type:Boolean, default:true}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Course",courseSchema);