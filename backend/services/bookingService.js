const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const User = require('../models/userModel');

const bookingService = {
    //Create Booking
    createBooking: async (data) => {
        try {
            const { roomId, checkInDate, checkOutDate } = data;
            const userId = data.userId;
            // console.log(data.userId);
            if (!roomId || !checkInDate || !checkOutDate) {
                throw new Error("All fields are required");
            }

            if (new Date(checkInDate) >= new Date(checkOutDate)) {
                throw new Error("Invalid Date Range");
            }

            const room = await Room.findById(roomId);

            if (!room || !room.isActive) {
                throw new Error("Room not available");
            }

            if (room.occupiedBeds >= room.capacity) {
                throw new Error("Room is full");
            }

            const existing = await Booking.findOne({
                userId,
                status: { $ne: "cancelled" }
            });
            if (existing) {
                throw new Error("User already has an active booking");
            }
            console.log(1);
            const booking = await Booking.create({
                userId, roomId, checkInDate, checkOutDate, bookingDate: new Date(), status: "confirmed"
            });

            room.occupiedBeds += 1;
            await room.save();

            return {
                success: true,
                message: "Room Booked Successfully",
                data: booking
            };
        } catch (error) {
            throw new Error(`Error While Booking Room: ${error.message}`);
        }
    },

    //Cancel Booking
    cancelBooking: async (bookingId, userId) => {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw new Error("Booking Not Found");
            }

            if (booking.userId.toString() !== userId) {
                throw new Error("Unauthorized");
            }

            if (booking.status === 'cancelled') {
                throw new Error("Booking already Cancelled");
            }

            const room = await Room.findById(booking.roomId);
            if (!room) {
                throw new Error("Associated Room Not Found");
            }

            if (room && room.occupiedBeds > 0) {
                room.occupiedBeds -= 1;
                await room.save();
            }

            booking.status = "cancelled";
            await booking.save();

            return {
                success: true,
                message: "Booking Cancelled Successfully",
                data: booking
            };
        } catch (error) {
            throw new Error(`Error While Cancelling Booking: ${error.message}`);
        }
    },

    //Get All Bookings(For Admin)
    getAllBookings: async (query) => {
        try {
            const { status, page = 1, limit = 10 } = query;

            const filter = status ? { status } : {};

            const bookings = await Booking.find(filter)
                .populate('userId', 'name email gender')
                .populate('roomId', 'roomNumber rent')
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);

            const total = await Booking.countDocuments(filter);

            return {
                success: true,
                message: "All Bookings Retrieved",
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
                data: bookings
            };
        } catch (error) {
            throw new Error(`Error While Retrieving All Booking: ${error.message}`);
        }
    },

    //Get Admin Dashboard Stats
    getDashboardStats: async () => {
        try {
            const totalBookings = await Booking.countDocuments();

            const cancelledBookings = await Booking.countDocuments({
                status: "cancelled"
            });

            const confirmedBookings = await Booking.countDocuments({
                status: "confirmed"
            });

            return {
                success: true,
                message: "Dashboard stats fetched successfully",
                data: {
                    totalBookings,
                    confirmedBookings,
                    cancelledBookings
                }
            };

        } catch (error) {
            throw new Error(`Error fetching dashboard stats: ${error.message}`);
        }
    },

    //Get Booking By Id(For Both)
    getById: async (bookingId) => {
        try {
            const booking = await Booking.findById(bookingId).populate('userId', 'name email gender').populate('roomId', 'roomNumber rent');
            if (!booking) {
                throw new Error("Booking Not Found");
            }
            return {
                success: true,
                message: "Booking Retrived Successfully",
                data: booking
            };
        } catch (error) {
            throw new Error(`Error While Retriving Booking: ${error.message}`);
        }
    },

    // Get My Booking (For User)
    getMyBooking: async (userId) => {
        try {
            // console.log("========== MY BOOKING DEBUG ==========");
            // console.log("Logged in userId:", userId);
    
            const bookings = await Booking.find({ userId });
    
            // console.log("Bookings for this user:", bookings);
            // console.log("======================================");
    
            const booking = await Booking.findOne({
                userId,
                status: "confirmed"
            }).populate("roomId");
    
            if (!booking) {
                throw new Error("No Active Booking Found");
            }
    
            return {
                success: true,
                message: "Booking Retrieved Successfully",
                data: booking
            };
    
        } catch (error) {
            throw new Error(
                `Error While Retrieving Booking: ${error.message}`
            );
        }
    },

    //Update Booking
    updateBooking: async (bookingId, data, userId, role) => {
        try {

            const { roomId, checkInDate, checkOutDate } = data;

            const booking = await Booking.findById(bookingId);

            if (!booking) {
                throw new Error("Booking Not Found");
            }

            // Only booking owner or admin can update
            if (
                booking.userId.toString() !== userId &&
                role !== "admin"
            ) {
                throw new Error("Unauthorized");
            }

            // Cannot update cancelled booking
            if (booking.status === "cancelled") {
                throw new Error("Cancelled booking cannot be updated");
            }

            // Validate dates
            if (checkInDate && checkOutDate) {
                if (new Date(checkInDate) >= new Date(checkOutDate)) {
                    throw new Error("Invalid Date Range");
                }
            }

            // Room Change
            if (roomId && roomId !== booking.roomId.toString()) {

                const newRoom = await Room.findById(roomId);

                if (!newRoom) {
                    throw new Error("Room Not Found");
                }

                if (!newRoom.isActive) {
                    throw new Error("Room is inactive");
                }

                if (newRoom.occupiedBeds >= newRoom.capacity) {
                    throw new Error("Room is full");
                }

                // Free previous room
                const oldRoom = await Room.findById(booking.roomId);

                if (oldRoom && oldRoom.occupiedBeds > 0) {
                    oldRoom.occupiedBeds -= 1;
                    await oldRoom.save();
                }

                // Occupy new room
                newRoom.occupiedBeds += 1;
                await newRoom.save();

                booking.roomId = roomId;
            }

            if (checkInDate) {
                booking.checkInDate = checkInDate;
            }

            if (checkOutDate) {
                booking.checkOutDate = checkOutDate;
            }

            await booking.save();

            return {
                success: true,
                message: "Booking Updated Successfully",
                data: booking
            };

        } catch (error) {
            throw new Error(`Error While Updating Booking: ${error.message}`);
        }
    },
};

module.exports = bookingService;