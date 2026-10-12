import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";

function Bookings() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [formData, setFormData] = useState({
        userId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: ""
    });

    const [loading, setLoading] = useState(false);


    // =========================
    // Fetch Students
    // =========================

    const fetchStudents = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {
                setStudents(response.data.data);
            }

        } catch (error) {

            console.log(
                "Fetch Students Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch students"
            );
        }
    };


    // =========================
    // Fetch Rooms
    // =========================

    const fetchRooms = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/rooms",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {
                setRooms(response.data.data);
            }

        } catch (error) {

            console.log(
                "Fetch Rooms Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch rooms"
            );
        }
    };


    // =========================
    // Fetch All Bookings
    // =========================

    const fetchBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/bookings/all-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {
                setBookings(response.data.data);
            }

        } catch (error) {

            console.log(
                "Fetch Bookings Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch bookings"
            );
        }
    };


    // =========================
    // Load Data
    // =========================

    useEffect(() => {

        fetchStudents();
        fetchRooms();
        fetchBookings();

    }, []);


    // =========================
    // Handle Input
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =========================
    // Create Booking
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()
        try {
            setLoading(true);
    
            const token = localStorage.getItem("token");
    
            // Get the selected student
            const selectedStudent = students.find(
                (student) => student._id === formData.userId
            );
    
            if (!selectedStudent) {
                alert("Please select a student");
                return;
            }
    
            const bookingData = {
                userId: selectedStudent._id,
                roomId: formData.roomId,
                checkInDate: formData.checkInDate,
                checkOutDate: formData.checkOutDate
            };
    
            console.log("Booking Data:", bookingData);
            console.log("Selected Student:", selectedStudent);
    
            const response = await axios.post(
                "http://localhost:5000/bookings",
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (response.data.success === true) {
                alert("Booking Created Successfully");
    
                setFormData({
                    userId: "",
                    roomId: "",
                    checkInDate: "",
                    checkOutDate: ""
                });
    
                fetchRooms();
                fetchBookings();
            }
    
        } catch (error) {
    
            console.log(
                "Create Booking Error:",
                error.response?.data || error.message
            );
    
            alert(
                error.response?.data?.message ||
                "Failed to create booking"
            );
    
        } finally {
            setLoading(false);
        }
    };


    // =========================
    // Cancel Booking
    // =========================

    const handleCancelBooking = async (bookingId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `http://localhost:5000/bookings/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert("Booking Cancelled Successfully");

                fetchBookings();
                fetchRooms();
            }

        } catch (error) {

            console.log(
                "Cancel Booking Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to cancel booking"
            );
        }
    };


    // =========================
    // Format Date
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-IN");
    };


    return (

        <div className="bookings-page">

            {/* =========================
                Header
            ========================== */}

            <div className="bookings-header">

                <div>

                    <h1>
                        Booking Management
                    </h1>

                    <p>
                        Assign rooms to registered students
                    </p>

                </div>

                <button
                    className="back-dashboard-button"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >
                    ← Dashboard
                </button>

            </div>


            {/* =========================
                Create Booking
            ========================== */}

            <div className="booking-form-card">

                <h2>
                    Create Booking
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="booking-form-grid">

                        {/* Student */}

                        <div className="booking-form-group">

                            <label>
                                Student
                            </label>

                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Student
                                </option>

                                {students.map((student) => (
                                    <option
                                        key={student._id}
                                        value={student._id}
                                    >
                                        {student.userId} - {student.name} - {student._id}
                                    </option>
                                ))}
                            </select>

                        </div>


                        {/* Room */}

                        <div className="booking-form-group">

                            <label>
                                Room
                            </label>

                            <select
                                name="roomId"
                                value={formData.roomId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Room
                                </option>

                                {rooms
                                    .filter(
                                        (room) =>
                                            room.isActive &&
                                            room.occupiedBeds <
                                            room.capacity
                                    )
                                    .map((room) => (

                                        <option
                                            key={room._id}
                                            value={room._id}
                                        >
                                            Room {room.roomNumber}
                                            {" - "}
                                            {room.capacity -
                                                room.occupiedBeds}
                                            {" beds available"}
                                        </option>

                                    ))}

                            </select>

                        </div>


                        {/* Check In */}

                        <div className="booking-form-group">

                            <label>
                                Check-in Date
                            </label>

                            <input
                                type="date"
                                name="checkInDate"
                                value={formData.checkInDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Check Out */}

                        <div className="booking-form-group">

                            <label>
                                Check-out Date
                            </label>

                            <input
                                type="date"
                                name="checkOutDate"
                                value={formData.checkOutDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="create-booking-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Booking"}
                    </button>

                </form>

            </div>


            {/* =========================
                Booking List
            ========================== */}

            <div className="booking-list-card">

                <div className="booking-list-header">

                    <h2>
                        All Bookings
                    </h2>

                    <span>
                        {bookings.length} Bookings
                    </span>

                </div>


                {bookings.length === 0 ? (

                    <p className="no-bookings">
                        No bookings found.
                    </p>

                ) : (

                    <div className="booking-table-wrapper">

                        <table className="booking-table">

                            <thead>

                                <tr>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Room
                                    </th>

                                    <th>
                                        Check-in
                                    </th>

                                    <th>
                                        Check-out
                                    </th>

                                    <th>
                                        Booking Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bookings.map((booking) => (

                                    <tr key={booking._id}>

                                        <td>

                                            <strong>
                                                {booking.userId?.userId ||
                                                    booking.userId?.name ||
                                                    "-"}
                                            </strong>

                                            {booking.userId?.name && (
                                                <small>
                                                    {booking.userId.name}
                                                </small>
                                            )}

                                        </td>


                                        <td>
                                            {booking.roomId?.roomNumber ||
                                                "-"}
                                        </td>


                                        <td>
                                            {formatDate(
                                                booking.checkInDate
                                            )}
                                        </td>


                                        <td>
                                            {formatDate(
                                                booking.checkOutDate
                                            )}
                                        </td>


                                        <td>
                                            {formatDate(
                                                booking.bookingDate
                                            )}
                                        </td>


                                        <td>

                                            <span
                                                className={`booking-status ${booking.status?.toLowerCase()
                                                    }`}
                                            >
                                                {booking.status ||
                                                    "Pending"}
                                            </span>

                                        </td>


                                        <td>

                                            {booking.status !== "cancelled" && (
                                                <button
                                                    className="cancel-booking-button"
                                                    onClick={() =>
                                                        handleCancelBooking(
                                                            booking._id
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Bookings;