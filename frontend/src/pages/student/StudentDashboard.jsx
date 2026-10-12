import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    // ==========================================
    // Logged-in User
    // ==========================================

    const [user] = useState(() => {

        const storedUser = localStorage.getItem("user");

        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }

    });


    // ==========================================
    // Booking State
    // ==========================================

    const [booking, setBooking] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(true);
    const [course,setCourse] = useState(""); 
    const [phone,setPhone] = useState(""); 

    const token = localStorage.getItem("token");


    // ==========================================
    // Fetch My Booking
    // ==========================================
    const userDetail = async()=>{
        try{
            const response = await axios.get(
                "http://localhost:5000/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // phone = ;
            setPhone(response.data.data.phone);
            setCourse(response.data.data.courseId.courseName);
        }
        catch(err){

        }
    }
    const fetchMyBooking = async () => {

        try {

            setBookingLoading(true);

            const response = await axios.get(
                "http://localhost:5000/bookings/my-booking",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log("My Booking Response:", response.data);


            const bookingData =
                response.data?.data || response.data;


            setBooking(bookingData);

        } catch (error) {

            console.error(
                "Error fetching my booking:",
                error.response?.data || error
            );

            setBooking(null);

        } finally {

            setBookingLoading(false);

        }
    };


    // ==========================================
    // Load Dashboard Data
    // ==========================================

    useEffect(() => {

        if (!token) {

            navigate("/login");
            return;

        }

        fetchMyBooking();
        userDetail();
    }, []);


    // ==========================================
    // Logout
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    // ==========================================
    // Booking Status
    // ==========================================

    const getBookingStatus = () => {

        if (bookingLoading) {
            return "Loading...";
        }

        if (!booking) {
            return "No Active Booking";
        }

        return booking.status || "Booked";

    };


    return (

        <div className="student-dashboard">

            {/* =====================================
                SIDEBAR
            ====================================== */}

            <aside className="student-sidebar">

                <div className="student-sidebar-header">

                    <h2>Hostel Management</h2>

                    <span>Student Portal</span>

                </div>


                <nav className="student-nav">

                    <button
                        className="student-nav-item active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>


                    <button
                        className="student-nav-item"
                    >
                        <span>👤</span>
                        My Profile
                    </button>


                    <button
                        className="student-nav-item"
                    >
                        <span>🛏</span>
                        My Room
                    </button>


                    <button
                        className="student-nav-item"
                        onClick={() => navigate("/student/booking")}
                    >
                        <span>📅</span>
                        My Booking
                    </button>


                    <button
                        className="student-nav-item"
                    >
                        <span>🍽</span>
                        My Meal Plan
                    </button>


                    <button
                        className="student-nav-item"
                    >
                        <span>💬</span>
                        Feedback
                    </button>


                    <button
                        className="student-nav-item"
                    >
                        <span>🔒</span>
                        Change Password
                    </button>

                </nav>


                <div className="student-sidebar-bottom">

                    <button
                        className="student-logout-button"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* =====================================
                MAIN CONTENT
            ====================================== */}

            <main className="student-main">


                {/* =====================================
                    HEADER
                ====================================== */}

                <header className="student-topbar">

                    <div>

                        <h1>
                            Welcome, {user?.name || "Student"}!
                        </h1>

                        <p>
                            Here's an overview of your hostel information.
                        </p>

                    </div>


                    <div className="student-profile-mini">

                        <div className="student-profile-avatar">

                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "S"}

                        </div>


                        <div>

                            <strong>
                                {user?.name || "Student"}
                            </strong>

                            <span>
                                {user?.userId || "Student"}
                            </span>

                        </div>

                    </div>

                </header>


                {/* =====================================
                    SUMMARY CARDS
                ====================================== */}

                <section className="student-summary-grid">


                    {/* ROOM */}

                    <div className="student-summary-card">

                        <div className="summary-icon room-icon">
                            🛏
                        </div>

                        <div>

                            <span className="summary-label">
                                My Room
                            </span>

                            <h3>
                                Not Assigned
                            </h3>

                            <p>
                                Room information
                            </p>

                        </div>

                    </div>


                    {/* BOOKING */}

                    <div className="student-summary-card">

                        <div className="summary-icon booking-icon">
                            📅
                        </div>

                        <div>

                            <span className="summary-label">
                                Booking
                            </span>

                            <h3>
                                {getBookingStatus()}
                            </h3>

                            <p>
                                Current booking status
                            </p>

                        </div>

                    </div>


                    {/* MEAL */}

                    <div className="student-summary-card">

                        <div className="summary-icon meal-icon">
                            🍽
                        </div>

                        <div>

                            <span className="summary-label">
                                Meal Plan
                            </span>

                            <h3>
                                No Active Plan
                            </h3>

                            <p>
                                Current meal subscription
                            </p>

                        </div>

                    </div>

                </section>


                {/* =====================================
                    CONTENT GRID
                ====================================== */}

                <section className="student-content-grid">


                    {/* =================================
                        PROFILE
                    ================================== */}

                    <div className="student-panel">

                        <div className="student-panel-header">

                            <div>

                                <h2>My Details</h2>

                                <p>
                                    Your registered information
                                </p>

                            </div>


                            <button
                                className="panel-action"
                            >
                                View Profile
                            </button>

                        </div>


                        <div className="student-details">


                            <div className="detail-row">

                                <span>Name</span>

                                <strong>
                                    {user?.name || "Not available"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>Student ID</span>

                                <strong>
                                    {user?.userId || "Not available"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>Email</span>

                                <strong>
                                    {user?.email || "Not available"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>Course</span>

                                <strong>
                                    {
                                        course
                                    }
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>Phone</span>

                                <strong>
                                    {phone || "Not available"}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        ROOM INFORMATION
                    ================================== */}

                    <div className="student-panel">

                        <div className="student-panel-header">

                            <div>

                                <h2>Room Information</h2>

                                <p>
                                    Your current room
                                </p>

                            </div>


                            <span className="not-assigned-badge">
                                Not Assigned
                            </span>

                        </div>


                        <div className="empty-panel">

                            <div className="empty-panel-icon">
                                🛏
                            </div>

                            <h3>
                                No Room Assigned
                            </h3>

                            <p>
                                Your room details will appear here
                                once a room is assigned to you.
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        BOOKING INFORMATION
                    ================================== */}

                    <div className="student-panel">

                        <div className="student-panel-header">

                            <div>

                                <h2>My Booking</h2>

                                <p>
                                    Your current hostel booking
                                </p>

                            </div>


                            {booking && (

                                <span className="not-assigned-badge">
                                    {booking.status || "Booked"}
                                </span>

                            )}

                        </div>


                        {bookingLoading ? (

                            <div className="empty-panel">

                                <div className="empty-panel-icon">
                                    📅
                                </div>

                                <h3>
                                    Loading Booking...
                                </h3>

                                <p>
                                    Fetching your booking information.
                                </p>

                            </div>

                        ) : !booking ? (

                            <div className="empty-panel">

                                <div className="empty-panel-icon">
                                    📅
                                </div>

                                <h3>
                                    No Active Booking
                                </h3>

                                <p>
                                    You currently do not have
                                    an active hostel booking.
                                </p>

                            </div>

                        ) : (

                            <div className="student-details">


                                <div className="detail-row">

                                    <span>Booking ID</span>

                                    <strong>
                                        {booking.bookingId ||
                                            booking._id ||
                                            "Not available"}
                                    </strong>

                                </div>


                                <div className="detail-row">

                                    <span>Room</span>

                                    <strong>
                                        {booking.roomId?.roomNumber ||
                                            booking.roomNumber ||
                                            "Not assigned"}
                                    </strong>

                                </div>


                                <div className="detail-row">

                                    <span>Start Date</span>

                                    <strong>
                                        {booking.checkInDate
                                            ? new Date(
                                                booking.checkInDate
                                            ).toLocaleDateString()
                                            : "Not available"}
                                    </strong>

                                </div>


                                <div className="detail-row">

                                    <span>End Date</span>

                                    <strong>
                                        {booking.checkOutDate
                                            ? new Date(
                                                booking.checkOutDate
                                            ).toLocaleDateString()
                                            : "Not available"}
                                    </strong>

                                </div>


                                <div className="detail-row">

                                    <span>Status</span>

                                    <strong>
                                        {booking.status || "Booked"}
                                    </strong>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================
                        MEAL PLAN
                    ================================== */}

                    <div className="student-panel">

                        <div className="student-panel-header">

                            <div>

                                <h2>Meal Plan</h2>

                                <p>
                                    Current meal subscription
                                </p>

                            </div>

                        </div>


                        <div className="empty-panel">

                            <div className="empty-panel-icon">
                                🍽
                            </div>

                            <h3>
                                No Active Meal Plan
                            </h3>

                            <p>
                                Your active meal subscription
                                will appear here.
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        QUICK ACTIONS
                    ================================== */}

                    <div className="student-panel">

                        <div className="student-panel-header">

                            <div>

                                <h2>Quick Actions</h2>

                                <p>
                                    Manage your account
                                </p>

                            </div>

                        </div>


                        <div className="quick-actions">


                            <button className="quick-action">

                                <span>👤</span>

                                <div>

                                    <strong>
                                        My Profile
                                    </strong>

                                    <small>
                                        View your details
                                    </small>

                                </div>

                            </button>


                            <button className="quick-action">

                                <span>💬</span>

                                <div>

                                    <strong>
                                        Send Feedback
                                    </strong>

                                    <small>
                                        Share your experience
                                    </small>

                                </div>

                            </button>


                            <button className="quick-action">

                                <span>🔒</span>

                                <div>

                                    <strong>
                                        Change Password
                                    </strong>

                                    <small>
                                        Update your password
                                    </small>

                                </div>

                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StudentDashboard;