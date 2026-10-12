const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userService = {
    //Create User
    createStudent: async (data,adminId) => {
        try{
            const{userId,name, email, password, phone, gender, courseId, address} = data;
            const existingEmail = await User.findOne({email});
            const existingUserId = await User.findOne({userId});
            if(existingEmail){
                throw new Error("Email already Exist");
            }
            if(existingUserId){
                throw new Error("UserId Already Exist");
            }
                           
            const HashedPassword = await bcrypt.hash(userId,10);

            const student = await User.create(
                {userId, name, email, password:HashedPassword, phone, gender, courseId, address, role:'student'}
            );
            return{
                success:true,
                message:"Student Created Successfully",
                data:student
            }
        }catch(error){
            throw new Error(`Error While Creating Student: ${error.message}`);
        }
    },

    //Get All User
    getAllStudent: async() => {
        try{
            const student = await User.find({role:'student'}).populate('courseId');
            return{
                success:true,
                message:"Student Fetch Successfully",
                data:student
            };
        }catch(error){
            throw new Error(`Error while Fetching Student: ${error.message}`);
        }
    },

    //Get User by ID
    getById: async (id) => {
        try{
            const student = await User.findOne({userId:id}).populate('courseId');
            if(!student){
                throw new Error("Student Not Found");
            }
            return{
                success:true,
                message:"Student Fetched By Id",
                data:student
            };
        }catch(error){
            throw new Error(`Error While Fetching Student: ${error.message}`);
        }
    },

    //Get User By Name
    getByName: async (name) => {
        try{
            const student = await User.findOne({name:name}).populate('courseId');
            if(!student){
                throw new Error("student Not Found");
            }
            return{
                success:true,
                message:"Student Fetched By Name",
                data:student
            };
        }catch(error){
            throw new Error(`Error while Fetching Student: ${error.message}`);
        }
    },

    //Update By Id
    updateById: async (id, updateData) => {
        try {
    
            const allowedFields = [
                "name",
                "email",
                "phone",
                "gender",
                "courseId",
                "address"
            ];
    
            const updates = {};
    
            allowedFields.forEach(field => {
                if (updateData[field] !== undefined) {
                    updates[field] = updateData[field];
                }
            });
    
            if (updates.email) {
                const existingEmail = await User.findOne({
                    email: updates.email,
                    userId: { $ne: id }
                });
    
                if (existingEmail) {
                    throw new Error("Email already exists");
                }
            }
    
            const student = await User.findOneAndUpdate(
                { userId: id },
                { $set: updates },
                { new: true }
            );
    
            if (!student) {
                throw new Error("Student Not Found");
            }
    
            return {
                success: true,
                message: "Student Updated Successfully",
                data: student
            };
    
        } catch (error) {
            throw new Error(`Error While Updating Student: ${error.message}`);
        }
    },

    //Delete By Id
    deleteById: async (id) => {
        try{
            const student = await User.findOneAndDelete({userId:id});
            if(!student){
            throw new Error("Student Not Found");
            }
            return{
                success:true,
                message:"Student Deleted Successfully"
            };
        }catch(error){
            throw new Error(`Error while deleting Student: ${error.message}`);
        }
    },

    //Status Change By Id
    statusChangeById: async (id, isActive) => {
        try {
    
            if (typeof isActive !== "boolean") {
                throw new Error("isActive must be true or false");
            }
    
            const student = await User.findOneAndUpdate(
                { userId: id },
                { $set: { isActive: isActive } },
                { new: true }
            );
    
            if (!student) {
                throw new Error("Student Not Found");
            }
    
            return {
                success: true,
                message: "Status Changed Successfully",
                data: student
            };
    
        } catch (error) {
            throw new Error(`Error While Changing Status: ${error.message}`);
        }
    }
};

module.exports = userService;
