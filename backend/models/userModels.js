import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must not exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [9, "Password must be at least 9 characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^[0-9]{10,15}$/, "Phone number must contain only 10-15 numerical digits"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minlength: [5, "Address must be at least 5 characters"],
        maxlength: [100, "Address must not exceed 100 characters"],
        match: [/^[a-zA-Z\s,.\-]+$/, "Address must contain only letters and basic punctuation"]
    },
    Answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true,
        minlength: [2, "Answer must be at least 2 characters"],
        maxlength: [100, "Answer must not exceed 100 characters"]
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('users', userSchema);