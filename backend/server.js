import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";

// Configure env
dotenv.config();

// Connect DB 
connectDB();

// Rest object
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rest APIs
app.get("/", (req, res) => {
  res.send({ message: "Welcome to my app" });
});

// Port
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan.white
  );
});
