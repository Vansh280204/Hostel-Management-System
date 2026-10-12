require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));
app.use(express.json());
const connectDB = require('./config/db.js');

//PORT
const PORT = process.env.PORT || 5000;

//Database Connection
connectDB();

//Login
const authRoute = require('./routes/authRoute.js');
app.use('/auth', authRoute);

//User
const userRoutes = require('./routes/userRoute');
app.use('/users', userRoutes);

//Course
const courseRoute = require('./routes/courseRoute');
app.use('/courses', courseRoute);

//Room
const roomRoute = require('./routes/roomRoute.js');
app.use('/rooms', roomRoute);

//Booking
const bookingRoute = require('./routes/bookingRoute.js');
app.use('/bookings', bookingRoute);

//Meal Plan
const mealPlanRoute = require('./routes/mealPlanRoute');
app.use('/meal-plans', mealPlanRoute);


//Subscribe the Meal Plan for Students
const userMealSubRoute =
    require('./routes/userMealSubRoute');
app.use(
    '/meal-subscriptions',
    userMealSubRoute
);


//Server Port Running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});