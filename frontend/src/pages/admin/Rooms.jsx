import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

function Rooms() {

    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);

    const [formData, setFormData] = useState({
        roomNumber: "",
        capacity: "",
        rent: ""
    });

    const [loading, setLoading] = useState(false);

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
    // Load Rooms
    // =========================

    useEffect(() => {
        fetchRooms();
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
    // Add Room
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/rooms",
                {
                    roomNumber: formData.roomNumber,
                    capacity: Number(formData.capacity),
                    rent: Number(formData.rent)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success === true) {

                alert("Room Added Successfully");

                setFormData({
                    roomNumber: "",
                    capacity: "",
                    rent: ""
                });

                fetchRooms();
            }

        } catch (error) {

            console.log(
                "Add Room Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add room"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="rooms-page">

            {/* =========================
                Header
            ========================== */}

            <div className="rooms-header">

                <div>
                    <h1>Room Management</h1>

                    <p>
                        Add and manage hostel rooms
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
                Add Room
            ========================== */}

            <div className="room-form-card">

                <h2>Add Room</h2>

                <form onSubmit={handleSubmit}>

                    <div className="room-form-grid">

                        {/* Room Number */}

                        <div className="room-form-group">

                            <label>
                                Room Number
                            </label>

                            <input
                                type="text"
                                name="roomNumber"
                                value={formData.roomNumber}
                                onChange={handleChange}
                                placeholder="Example: 101"
                                required
                            />

                        </div>


                        {/* Capacity */}

                        <div className="room-form-group">

                            <label>
                                Capacity
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="Example: 4"
                                min="1"
                                required
                            />

                        </div>


                        {/* Rent */}

                        <div className="room-form-group">

                            <label>
                                Rent
                            </label>

                            <input
                                type="number"
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                placeholder="Example: 5000"
                                min="0"
                                required
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="add-room-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Adding..."
                            : "Add Room"}
                    </button>

                </form>

            </div>


            {/* =========================
                Room List
            ========================== */}

            <div className="room-list-card">

                <div className="room-list-header">

                    <h2>
                        Rooms
                    </h2>

                    <span>
                        {rooms.length} Rooms
                    </span>

                </div>


                {rooms.length === 0 ? (

                    <p className="no-rooms">
                        No rooms found.
                    </p>

                ) : (

                    <div className="room-table-wrapper">

                        <table className="room-table">

                            <thead>

                                <tr>

                                    <th>
                                        Room Number
                                    </th>

                                    <th>
                                        Capacity
                                    </th>

                                    <th>
                                        Occupied
                                    </th>

                                    <th>
                                        Available
                                    </th>

                                    <th>
                                        Rent
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {rooms.map((room) => {

                                    const availableBeds =
                                        room.capacity -
                                        room.occupiedBeds;

                                    return (

                                        <tr key={room._id}>

                                            <td>
                                                <strong>
                                                    {room.roomNumber}
                                                </strong>
                                            </td>

                                            <td>
                                                {room.capacity}
                                            </td>

                                            <td>
                                                {room.occupiedBeds}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        availableBeds > 0
                                                            ? "available-beds"
                                                            : "full-beds"
                                                    }
                                                >
                                                    {availableBeds}
                                                </span>

                                            </td>

                                            <td>
                                                ₹{room.rent}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        room.isActive
                                                            ? "status-active"
                                                            : "status-inactive"
                                                    }
                                                >
                                                    {room.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Rooms;