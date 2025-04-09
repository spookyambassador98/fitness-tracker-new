const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    Current_weight: String,
    Desired_weight: String,
    Height: String,
    BMI: String,
    Body_Fat_Percentage: String,
    BMR: String,
    RHR: String,
    MHR: String,
    LBM: String,
    WHR: String,
    VO2_Max: String,
    Blood_Pressure: String,
    Hydration_Level: String,
    Activity_Level: String,
    Age: Number,
    Gender: String,
    Goal: String,

});

const User = mongoose.model('User', userSchema);

module.exports = User;
