import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MealSubscriptions.css";

function MealSubscriptions() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [mealPlans, setMealPlans] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const [formData, setFormData] = useState({
        userId: "",
        mealPlanId: "",
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(false);


    // ==========================
    // Fetch Students
    // ==========================

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


    // ==========================
    // Fetch Meal Plans
    // ==========================

    const fetchMealPlans = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/meal-plans",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                setMealPlans(
                    response.data.data.filter(
                        plan => plan.isActive
                    )
                );
            }

        } catch (error) {

            console.log(
                "Fetch Meal Plans Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch meal plans"
            );
        }
    };


    // ==========================
    // Fetch Subscriptions
    // ==========================

    const fetchSubscriptions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/meal-subscriptions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {
                setSubscriptions(response.data.data);
            }

        } catch (error) {

            console.log(
                "Fetch Subscriptions Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to fetch meal subscriptions"
            );
        }
    };


    // ==========================
    // Initial Load
    // ==========================

    useEffect(() => {

        fetchStudents();
        fetchMealPlans();
        fetchSubscriptions();

    }, []);


    // ==========================
    // Handle Input
    // ==========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // ==========================
    // Assign Meal Plan
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.endDate <= formData.startDate) {

            alert(
                "End date must be greater than start date"
            );

            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/meal-subscriptions",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert(
                    "Meal Plan Assigned Successfully"
                );

                setFormData({
                    userId: "",
                    mealPlanId: "",
                    startDate: "",
                    endDate: ""
                });

                fetchSubscriptions();
            }

        } catch (error) {

            console.log(
                "Assign Meal Plan Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to assign meal plan"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================
    // Cancel Subscription
    // ==========================

    const handleCancel = async (subscriptionId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this meal subscription?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `http://localhost:5000/meal-subscriptions/${subscriptionId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert(
                    "Meal Subscription Cancelled Successfully"
                );

                fetchSubscriptions();
            }

        } catch (error) {

            console.log(
                "Cancel Subscription Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to cancel subscription"
            );
        }
    };


    // ==========================
    // Format Date
    // ==========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    return (

        <div className="meal-subscriptions-page">

            {/* ==========================
                Header
            ========================== */}

            <div className="meal-subscriptions-header">

                <div>

                    <h1>Meal Subscription Management</h1>

                    <p>
                        Assign meal plans to hostel students
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


            {/* ==========================
                Assign Form
            ========================== */}

            <div className="subscription-form-card">

                <h2>Assign Meal Plan</h2>

                <form onSubmit={handleSubmit}>

                    <div className="subscription-form-grid">

                        {/* Student */}

                        <div className="subscription-form-group">

                            <label>Student</label>

                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Student
                                </option>

                                {students
                                    .filter(
                                        student =>
                                            student.isActive
                                    )
                                    .map(student => (

                                        <option
                                            key={student._id}
                                            value={student.userId}
                                        >
                                            {student.userId} -{" "}
                                            {student.name}
                                        </option>

                                    ))
                                }

                            </select>

                        </div>


                        {/* Meal Plan */}

                        <div className="subscription-form-group">

                            <label>Meal Plan</label>

                            <select
                                name="mealPlanId"
                                value={formData.mealPlanId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Meal Plan
                                </option>

                                {mealPlans.map(plan => (

                                    <option
                                        key={plan._id}
                                        value={plan._id}
                                    >
                                        {plan.planName} - ₹
                                        {plan.price}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Start Date */}

                        <div className="subscription-form-group">

                            <label>Start Date</label>

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* End Date */}

                        <div className="subscription-form-group">

                            <label>End Date</label>

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="assign-meal-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Assigning..."
                            : "Assign Meal Plan"
                        }

                    </button>

                </form>

            </div>


            {/* ==========================
                Subscription List
            ========================== */}

            <div className="subscription-list-card">

                <div className="subscription-list-header">

                    <h2>Meal Subscriptions</h2>

                    <span>
                        {subscriptions.length} Subscriptions
                    </span>

                </div>


                {subscriptions.length === 0 ? (

                    <p className="no-subscriptions">
                        No meal subscriptions found.
                    </p>

                ) : (

                    <div className="subscription-table-wrapper">

                        <table className="subscription-table">

                            <thead>

                                <tr>

                                    <th>Student</th>

                                    <th>Meal Plan</th>

                                    <th>Type</th>

                                    <th>Price</th>

                                    <th>Start Date</th>

                                    <th>End Date</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {subscriptions.map(
                                    (subscription) => (

                                        <tr
                                            key={
                                                subscription._id
                                            }
                                        >

                                            <td>

                                                <strong>
                                                    {
                                                        subscription
                                                            .userId
                                                            ?.userId
                                                    }
                                                </strong>

                                                <small>
                                                    {
                                                        subscription
                                                            .userId
                                                            ?.name
                                                    }
                                                </small>

                                            </td>


                                            <td>

                                                {
                                                    subscription
                                                        .mealPlanId
                                                        ?.planName
                                                }

                                            </td>


                                            <td>

                                                {
                                                    subscription
                                                        .mealPlanId
                                                        ?.type
                                                }

                                            </td>


                                            <td>

                                                ₹
                                                {
                                                    subscription
                                                        .mealPlanId
                                                        ?.price
                                                }

                                            </td>


                                            <td>

                                                {formatDate(
                                                    subscription.startDate
                                                )}

                                            </td>


                                            <td>

                                                {formatDate(
                                                    subscription.endDate
                                                )}

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        `subscription-status ${
                                                            subscription.status
                                                                ?.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    {
                                                        subscription.status
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                {subscription.status !==
                                                    "Cancelled" && (

                                                    <button
                                                        className="cancel-subscription-button"
                                                        onClick={() =>
                                                            handleCancel(
                                                                subscription._id
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MealSubscriptions;