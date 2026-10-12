import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MealPlans.css";

function MealPlans() {

    const navigate = useNavigate();

    const [mealPlans, setMealPlans] = useState([]);

    const [formData, setFormData] = useState({
        planName: "",
        type: "",
        price: "",
        mealsPerDay: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

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
                setMealPlans(response.data.data);
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
    // Load Meal Plans
    // ==========================

    useEffect(() => {
        fetchMealPlans();
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
    // Add Meal Plan
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/meal-plans",
                {
                    planName: formData.planName,
                    type: formData.type,
                    price: Number(formData.price),
                    mealsPerDay: Number(formData.mealsPerDay),
                    description: formData.description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert("Meal Plan Added Successfully");

                setFormData({
                    planName: "",
                    type: "",
                    price: "",
                    mealsPerDay: "",
                    description: ""
                });

                fetchMealPlans();
            }

        } catch (error) {

            console.log(
                "Add Meal Plan Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add meal plan"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="meal-plans-page">

            {/* ==========================
                Header
            ========================== */}

            <div className="meal-plans-header">

                <div>
                    <h1>Meal Plan Management</h1>

                    <p>
                        Add and manage hostel meal plans
                    </p>
                </div>

                <button
                    className="back-dashboard-button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Dashboard
                </button>

            </div>


            {/* ==========================
                Add Meal Plan
            ========================== */}

            <div className="meal-form-card">

                <h2>Add Meal Plan</h2>

                <form onSubmit={handleSubmit}>

                    <div className="meal-form-grid">

                        <div className="meal-form-group">

                            <label>Plan Name</label>

                            <input
                                type="text"
                                name="planName"
                                value={formData.planName}
                                onChange={handleChange}
                                placeholder="Example: Monthly Full Day"
                                required
                            />

                        </div>


                        <div className="meal-form-group">

                            <label>Meal Type</label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Meal Type
                                </option>

                                <option value="Breakfast">
                                    Breakfast
                                </option>

                                <option value="Lunch">
                                    Lunch
                                </option>

                                <option value="Dinner">
                                    Dinner
                                </option>

                                <option value="Full Day">
                                    Full Day
                                </option>

                            </select>

                        </div>


                        <div className="meal-form-group">

                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Example: 3000"
                                min="0"
                                required
                            />

                        </div>


                        <div className="meal-form-group">

                            <label>Meals Per Day</label>

                            <input
                                type="number"
                                name="mealsPerDay"
                                value={formData.mealsPerDay}
                                onChange={handleChange}
                                placeholder="Example: 3"
                                min="1"
                                required
                            />

                        </div>


                        <div className="meal-form-group full-width">

                            <label>Description</label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter meal plan description"
                                rows="3"
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="add-meal-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Adding..."
                            : "Add Meal Plan"
                        }
                    </button>

                </form>

            </div>


            {/* ==========================
                Meal Plan List
            ========================== */}

            <div className="meal-list-card">

                <div className="meal-list-header">

                    <h2>Meal Plans</h2>

                    <span>
                        {mealPlans.length} Plans
                    </span>

                </div>


                {mealPlans.length === 0 ? (

                    <p className="no-meal-plans">
                        No meal plans found.
                    </p>

                ) : (

                    <div className="meal-table-wrapper">

                        <table className="meal-table">

                            <thead>

                                <tr>
                                    <th>Plan Name</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Meals / Day</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>

                            </thead>


                            <tbody>

                                {mealPlans.map((plan) => (

                                    <tr key={plan._id}>

                                        <td>
                                            <strong>
                                                {plan.planName}
                                            </strong>
                                        </td>

                                        <td>
                                            {plan.type}
                                        </td>

                                        <td>
                                            ₹{plan.price}
                                        </td>

                                        <td>
                                            {plan.mealsPerDay}
                                        </td>

                                        <td>
                                            {plan.description || "-"}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    plan.isActive
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }
                                            >
                                                {plan.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                                }
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

export default MealPlans;