const Course = require('../models/courseModel');

const courseService = {
    //Create Course
    createCourse: async (data,adminId) => {
        try{
            const{courseName,duration} = data;
            if(!courseName || !duration){
                throw new Error("All field are required");
            }
            const existing = await Course.findOne({courseName});
            if(existing){
                throw new Error("Course Already Exist");
            };

            const course = await Course.create({courseName, duration});
            return{
                success:true,
                message:"Course Created Successfully",
                data:course
            };
        }catch(error){
            throw new Error(`Error While Creating Course: ${error.message}`);
        }
    },

    //Get All Course
    getAllCourse: async () => {
        try{
            const course = await Course.find();
            return{
                success:true,
                message:"Courses Fetched Successfully",
                data:course
            };
        }catch(error){
            throw new Error(`Error while fetching Course: ${error.message}`);
        }
    },

    //Get Course By Name
    getByName: async (name) => {
        try{
            const course = await Course.findOne({courseName:name});
            if(!course){
                throw new Error("Course Not Found");
            }
            return{
                success:true,
                message:"Course fetched By Name",
                data:course
            };
        }catch(error){
            throw new Error(`Error while Fetching course: ${error.message}`);
        }
    },

    //Update Course By Name
    updateByName: async (name,updateData) => {
        try{
            const course = await Course.findOneAndUpdate(
                {courseName:name},
                {$set:updateData},
                {returnDocument:'after'});
            if(!course){
                throw new Error("Course Not Found");
            }
            return{
                success:true,
                message:"Course Update Successfully",
                data:course
            };
        }catch(error){
            throw new Error(`Error while Updating Course: ${error.message}`);
        }
    },

    //Delete Course By Name
    deleteByName: async (name) => {
        try{
            const course = await Course.findOneAndDelete({courseName:name});
            if(!course){
                throw new Error("Course Not Found");
            }
            return{
                success:true,
                message:"Course Deleted Successfully"
            };
        }catch(error){
            throw new Error(`Error While deleting Course: ${error.message}`);
        }
    },

    //Change Status of Course by Name
    changeStatusByName: async (name,isActive) => {
        try{
            const course = await Course.findOneAndUpdate(
                {courseName:name},
                {$set:{isActive:isActive}},
                {returnDocument:'after'}
            );
            if(!course){
                throw new Error("Course not Found");
            }
            return{
                success:true,
                message:"Status Change Successfully",
                data:course
            };
        }catch(error){
            throw new Error(`Error while changing Status: ${error.message}`);
        }
    }
};

module.exports = courseService;