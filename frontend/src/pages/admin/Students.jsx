import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Students.css";

function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        courseId: "",
        address: ""
    });

    const token = localStorage.getItem("token");


    // ==========================================
    // Fetch Students
    // ==========================================

    const fetchStudents = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Adjust according to your backend response
            const studentData =
                response.data?.data || response.data;

            setStudents(
                Array.isArray(studentData)
                    ? studentData
                    : []
            );

        } catch (error) {

            console.error(
                "Error fetching students:",
                error.response?.data || error
            );

        }
    };


    // ==========================================
    // Fetch Courses
    // ==========================================

    const fetchCourses = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/courses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const courseData =
                response.data?.data || response.data;

            setCourses(
                Array.isArray(courseData)
                    ? courseData.filter(course => course.isActive)
                    : []
            );

        } catch (error) {

            console.error(
                "Error fetching courses:",
                error.response?.data || error
            );
        }
    };


    // ==========================================
    // Load Data
    // ==========================================

    useEffect(() => {

        fetchStudents();
        fetchCourses();

    }, []);


    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // ==========================================
    // Add Student
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success !== false) {

                alert("Student Added Successfully");

                // Clear form
                setFormData({
                    userId: "",
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    gender: "",
                    courseId: "",
                    address: ""
                });

                // Refresh registered students
                fetchStudents();

            } else {

                alert(
                    response.data.message ||
                    "Failed to add student"
                );
            }

        } catch (error) {

            console.error(
                "Add Student Error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to add student"
            );
        }
    };


    // ==========================================
    // Logout / Dashboard
    // ==========================================

    const goToDashboard = () => {
        navigate("/admin/dashboard");
    };


    return (

        <div className="students-page">

            {/* =====================================
                Header
            ====================================== */}

            <div className="students-header">

                <div>
                    <h1>Add Student</h1>

                    <p>
                        Add and manage students in the hostel system
                    </p>
                </div>

                <button
                    className="dashboard-button"
                    onClick={goToDashboard}
                >
                    ← Dashboard
                </button>

            </div>


            {/* =====================================
                Main Two Column Layout
            ====================================== */}

            <div className="students-content">


                {/* =====================================
                    LEFT - ADD STUDENT FORM
                ====================================== */}

                <div className="student-form-card">

                    <h2>Register Student</h2>

                    <p className="card-subtitle">
                        Enter student information
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div className="form-row">

                            <div className="form-group">

                                <label>User ID</label>

                                <input
                                    type="text"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    placeholder="Enter student ID"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter student name"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />

                            </div>


                            {/* <div className="form-group">

                                <label>Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    hidden
                                />

                            </div> */}

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Gender</label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="form-group">

                            <label>Course</label>

                            <select
                                name="courseId"
                                value={formData.courseId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Course
                                </option>

                                {courses.map((course) => (

                                    <option
                                        key={course._id}
                                        value={course._id}
                                    >
                                        {course.courseName}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Address</label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter student address"
                                rows="4"
                                required
                            />

                        </div>


                        <div className="form-button-container">

                            <button
                                type="submit"
                                className="add-student-button"
                            >
                                Add Student
                            </button>

                        </div>

                    </form>

                </div>


                {/* =====================================
                    RIGHT - REGISTERED STUDENTS
                ====================================== */}

                <div className="registered-students-card">

                    <div className="registered-header">

                        <div>

                            <h2>Registered Students</h2>

                            <p>
                                {students.length} student
                                {students.length !== 1 ? "s" : ""}
                                {" "}registered
                            </p>

                        </div>


                        <button
                            className="refresh-button"
                            onClick={fetchStudents}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {/* =================================
                        Student List
                    ================================== */}

                    {students.length === 0 ? (

                        <div className="no-students">

                            <div className="empty-icon">
                                👨‍🎓
                            </div>

                            <h3>No Students Registered</h3>

                            <p>
                                Add a student using the form
                                to see them here.
                            </p>

                        </div>

                    ) : (

                        <div className="student-list">

                            {students.map((student) => (

                                <div
                                    className="student-item"
                                    key={student._id}
                                >

                                    <div className="student-avatar">
                                        {student.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="student-info">

                                        <h3>
                                            {student.name}
                                        </h3>

                                        <span className="student-id">
                                            {student.userId}
                                        </span>

                                        <div className="student-details">

                                            <span>
                                                {student.email}
                                            </span>

                                            <span>
                                                {student.phone}
                                            </span>

                                        </div>


                                        <div className="student-bottom">

                                            <span className="course-badge">
                                                {student.courseId?.courseName ||
                                                    "No Course"}
                                            </span>

                                            <span
                                                className={
                                                    student.isActive
                                                        ? "status-badge active"
                                                        : "status-badge inactive"
                                                }
                                            >
                                                {student.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Students;