const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},

        roomId:{type:mongoose.Schema.Types.ObjectId, ref:"Room", required:true},

        bookingDate:{type:Date, default:Date.now},

        checkInDate:{type:Date, required:true},

        checkOutDate:{type:Date, required:true},

        status:{type:String, enum:["pending", "confirmed","cancelled"]}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Booking",bookingSchema);