import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
    
        try {
    
            const response = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    email,
                    password
                }
            );
    
            const data = response.data;
    
            if (data.success === true) {
    
                // Store JWT
                localStorage.setItem("token", data.token);
    
                // Store logged-in user
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
    
                alert("Login Successful");
    
    
                // =================================
                // Redirect According To Role
                // =================================
    
                if (data.user.role === "admin") {
    
                    navigate("/admin/dashboard");
    
                } else if (data.user.role === "student") {
    
                    navigate("/student/dashboard");
    
                } else {
    
                    alert("Invalid User Role");
    
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
    
            } else {
    
                alert(
                    data.message ||
                    "Login Failed"
                );
            }
    
        } catch (error) {
    
            const message =
                error.response?.data?.message ||
                "Something went wrong. Please try again.";
    
            alert(message);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Hostel Management System</h1>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div className="auth-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>

                    <div className="auth-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;