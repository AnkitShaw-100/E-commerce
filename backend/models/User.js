import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    // Fields for password reset (OTP)
    resetOtp: { type: String, default: null },
    resetOtpExpires: { type: Date, default: null },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
