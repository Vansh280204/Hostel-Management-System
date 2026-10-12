const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    userId: {type:String, required:true, unique:true},

    name: {type:String, required:true},

    email: {type:String, unique:true, required:true, lowercase:true},

    password: {type:String, required:true},

    phone: {type:Number, required:true, unique:true},

    gender: {type:String, enum:["male","female","other"]},

    courseId: {type:mongoose.Schema.Types.ObjectId, ref:"Course", required:true},

    address: {type:String, required:true},

    role: {type:String, enum:["admin","student"], default:"student"},

    isActive: {type:Boolean, default:true}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User",userSchema);