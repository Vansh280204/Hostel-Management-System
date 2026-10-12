import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Students from "../pages/admin/Students";
import Courses from "../pages/admin/Courses";
import Rooms from "../pages/admin/Rooms";
import Bookings from "../pages/admin/Bookings";
import MealPlans from "../pages/admin/MealPlans";
import MealSubscriptions from "../pages/admin/MealSubscriptions";
import StudentDashboard from "../pages/student/StudentDashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* First page */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* ================= ADMIN ROUTES ================= */}

                {/* Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Students */}
                <Route
                    path="/admin/students"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Students />
                        </ProtectedRoute>
                    }
                />

                {/* Meal Subscriptions */}
                <Route
                    path="/admin/meal-subscriptions"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <MealSubscriptions />
                        </ProtectedRoute>
                    }
                />

                {/* Bookings */}
                <Route
                    path="/admin/Bookings"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Bookings />
                        </ProtectedRoute>
                    }
                />

                {/* Meal Plans */}
                <Route
                    path="/admin/MealPlans"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <MealPlans />
                        </ProtectedRoute>
                    }
                />

                {/* Rooms */}
                <Route
                    path="/admin/rooms"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Rooms />
                        </ProtectedRoute>
                    }
                />

                {/* Courses */}
                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Courses />
                        </ProtectedRoute>
                    }
                />

                {/* ================= STUDENT ROUTES ================= */}

                {/* Student Dashboard */}
                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;