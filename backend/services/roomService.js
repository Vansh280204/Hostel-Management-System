const Room = require('../models/roomModel');

const roomService = {
    //Create Room
    createRoom: async (roomdata,adminId) => {
        try{
            const{roomNumber, capacity, rent, occupiedBeds} = roomdata;
            const existing = await Room.findOne({roomNumber});
            if(existing){
                throw new Error(`Room Already Exist`);
            }
            const room = await Room.create({roomNumber, capacity, rent, occupiedBeds});
            return{
                success:true,
                message:"Room Created Successfully",
                data:room
            };
        }catch(error){
            throw new Error(`Error While Creating Room: ${error.message}`);
        }
    },

    //Get All Room
    getAllRoom: async () => {
        try{
            const room = await Room.find();
            return{
                success:true,
                message:"All Room Fetched Successfully",
                data:room
            };
        }catch(error){
            throw new Error(`Error While Fetching Room: ${error.message}`);
        }
    },

    //Get Room By Room Number
    getByNumber: async (number) => {
        try{
            const room = await Room.findOne({roomNumber:number});
            if(!room){
                throw new Error("Room Not Found");
            }
            return{
                success:true,
                message:`Room Number ${number} found`,
                data:room
            };
        }catch(error){
            throw new Error(`Error While Fetching Room: ${error.message}`);
        }
    },

    //Update Room By Number
    updateByNumber: async (number, updateData) => {
        try{
            const room = await Room.findOneAndUpdate(
                {roomNumber:number},
                {$set:updateData},
                {returnDocument:'after'});
            if(!room){
                throw new Error("Room Not Found");
            }
            return{
                success:true,
                message:`Room ${number} Updated Successfully`,
                data:room
            };
        }catch(error){
            throw new Error(`Error while Updating Room: ${error.message}`);
        }
    },

    //Delete Room By Number
    deleteByNumber: async (number) => {
        try{
            const room = await Room.findOneAndDelete({roomNumber:number});
            if(!room){
                throw new Error(`Room ${number} not Found`);
            }
            return{
                success:true,
                message:`Room ${number} Deleted Successfully`
            };
        }catch(error){
            throw new Error(`Error While Deleting Room: ${error.message}`);
        }
    },

    //Change the Status of Room By Number
    changeStatusByNumber: async (number) => {
        try{
            const room = await Room.findOne({roomNumber:number});
            if(!room){
                throw new Error(`Room ${number} Not Found`);
            }
            room.isActive = !room.isActive;
            await room.save();
            return{
                success:true,
                message:`Room is now ${room.isActive ? "Active" : "Inactive"}`,
                data:room
            };
        }catch(error){
            throw new Error(`Error While Changing Status: ${error.message}`);
        }
    }
};

module.exports = roomService;