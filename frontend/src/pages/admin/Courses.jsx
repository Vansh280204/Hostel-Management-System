import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [formData, setFormData] = useState({
        courseName: "",
        duration: ""
    });

    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/courses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {
                setCourses(response.data.data);
            }

        } catch (error) {
            console.log(
                "Fetch Courses Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch courses"
            );
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/courses",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert("Course Added Successfully");

                setFormData({
                    courseName: "",
                    duration: ""
                });

                fetchCourses();
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add course"
            );

            console.log(
                "Add Course Error:",
                error.response?.data || error.message
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="courses-page">

            {/* HEADER */}

            <div className="courses-header">

                <div>
                    <h1>Course Management</h1>
                    <p>Add and manage hostel courses</p>
                </div>

                <button
                    className="back-dashboard-button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Dashboard
                </button>

            </div>


            {/* ADD COURSE */}

            <div className="course-form-card">

                <h2>Add Course</h2>

                <form onSubmit={handleSubmit}>

                    <div className="course-form-grid">

                        <div className="course-form-group">

                            <label>Course Name</label>

                            <input
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                placeholder="Enter course name"
                                required
                            />

                        </div>


                        <div className="course-form-group">

                            <label>Duration</label>

                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Example: 3 Years"
                                required
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="add-course-button"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Course"}
                    </button>

                </form>

            </div>


            {/* COURSE LIST */}

            <div className="course-list-card">

                <div className="course-list-header">
                    <h2>Courses</h2>
                    <span>{courses.length} Courses</span>
                </div>

                {courses.length === 0 ? (

                    <p className="no-courses">
                        No courses found.
                    </p>

                ) : (

                    <div className="course-table-wrapper">

                        <table className="course-table">

                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {courses.map((course) => (

                                    <tr key={course._id}>

                                        <td>
                                            {course.courseName}
                                        </td>

                                        <td>
                                            {course.duration}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    course.isActive
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }
                                            >
                                                {course.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

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

export default Courses;