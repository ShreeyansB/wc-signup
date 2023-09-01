const mongoose = require("../config/database");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
