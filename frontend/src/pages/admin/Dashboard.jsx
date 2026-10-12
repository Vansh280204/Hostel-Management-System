import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="admin-layout">

            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">

                <div className="sidebar-logo">
                    <h2>HMS</h2>
                    <span>Hostel Management</span>
                </div>

                <nav className="sidebar-menu">

                    <button
                        className="menu-item active"
                        onClick={() => navigate("/admin/dashboard")}
                    >
                        <span>▣</span>
                        Dashboard
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/students")}
                    >
                        <span>👨‍🎓</span>
                        Students
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/rooms")}
                    >
                        <span>🛏</span>
                        Rooms
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/bookings")}
                    >
                        <span>📋</span>
                        Bookings
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/courses")}
                    >
                        <span>🎓</span>
                        Courses
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/MealPlans")}
                    >
                        <span>🍽</span>
                        Meal Plans
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin/meal-subscriptions")}
                    >
                        <span>🍽</span>
                        Meal Subscriptions
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="admin-main">

                {/* TOP BAR */}

                <header className="admin-header">

                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome to Hostel Management System</p>
                    </div>

                    <div className="admin-profile">

                        <div className="admin-avatar">
                            A
                        </div>

                        <div className="admin-info">
                            <strong>{user?.name || "Admin"}</strong>
                            <span>Administrator</span>
                        </div>

                    </div>

                </header>


                {/* ================= STAT CARDS ================= */}

                <section className="dashboard-stats">

                    <div
                        className="stat-card"
                        onClick={() => navigate("/admin/students")}
                    >
                        <div className="stat-icon student-icon">
                            👨‍🎓
                        </div>

                        <div>
                            <h3>Students</h3>
                            <p>Manage Students</p>
                        </div>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/admin/rooms")}
                    >
                        <div className="stat-icon room-icon">
                            🛏
                        </div>

                        <div>
                            <h3>Rooms</h3>
                            <p>Manage Rooms</p>
                        </div>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/admin/bookings")}
                    >
                        <div className="stat-icon booking-icon">
                            📋
                        </div>

                        <div>
                            <h3>Bookings</h3>
                            <p>Manage Bookings</p>
                        </div>
                    </div>


                    <div
                        className="stat-card"
                        onClick={() => navigate("/admin/courses")}
                    >
                        <div className="stat-icon course-icon">
                            🎓
                        </div>

                        <div>
                            <h3>Courses</h3>
                            <p>Manage Courses</p>
                        </div>
                    </div>

                </section>


                {/* ================= MANAGEMENT ================= */}

                <section className="management-section">

                    <div className="section-heading">
                        <h2>Management</h2>
                        <p>Manage different areas of the hostel system</p>
                    </div>


                    <div className="management-grid">

                        <div
                            className="management-card"
                            onClick={() => navigate("/admin/students")}
                        >
                            <div className="management-icon">
                                👨‍🎓
                            </div>

                            <div>
                                <h3>Student Management</h3>
                                <p>
                                    Add, view, update and delete students.
                                </p>
                            </div>

                            <span className="card-arrow">→</span>
                        </div>


                        <div
                            className="management-card"
                            onClick={() => navigate("/admin/rooms")}
                        >
                            <div className="management-icon">
                                🛏
                            </div>

                            <div>
                                <h3>Room Management</h3>
                                <p>
                                    Manage hostel rooms and occupancy.
                                </p>
                            </div>

                            <span className="card-arrow">→</span>
                        </div>


                        <div
                            className="management-card"
                            onClick={() => navigate("/admin/bookings")}
                        >
                            <div className="management-icon">
                                📋
                            </div>

                            <div>
                                <h3>Booking Management</h3>
                                <p>
                                    View and manage student bookings.
                                </p>
                            </div>

                            <span className="card-arrow">→</span>
                        </div>


                        <div
                            className="management-card"
                            onClick={() => navigate("/admin/courses")}
                        >
                            <div className="management-icon">
                                🎓
                            </div>

                            <div>
                                <h3>Course Management</h3>
                                <p>
                                    Add and manage available courses.
                                </p>
                            </div>

                            <span className="card-arrow">→</span>
                        </div>


                        <div
                            className="management-card"
                            onClick={() => navigate("/admin/MealPlans")}
                        >
                            <div className="management-icon">
                                🍽
                            </div>

                            <div>
                                <h3>Meal Plan Management</h3>
                                <p>
                                    Manage hostel meal plans.
                                </p>
                            </div>

                            <span className="card-arrow">→</span>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;