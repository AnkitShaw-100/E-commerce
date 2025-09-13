// Mujhe Mongoose ka ek hi function pata tha - 1. MongoDB aur Node.js ke beech ek connection aur bridge establish karna.
// BUT aur bhi functions hai
// 2. Schema define karna
// 3. Model banake CRUD operations easy karna
// 4. Validation aur Middleware

// Is file m mujhe aur ek cheez jan na tha console.log and console.error ka difference
// console.log (stdout) → console.log --> Normal message
// console.error (stderr) → console.error --> Error message
// Terminal pe dono same jaisa print hote hain, lekin system ke andar wo alag-alag streams me jaate hain.
// Isiliye bade projects me monitoring/logging tools errors ko easily alag se pakad lete hain.

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
