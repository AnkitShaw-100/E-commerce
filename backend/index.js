// dotenv ka kaam hai environment variables ko manage karna.
// Node.js khud se .env file ko read nahi karta.
// Matlab .env file wahi padhi rahegi, par process.env.PORT ya process.env.MONGO_URI empty milegi.
// To jab tak hum manually .env ko read karke parse na kare (ya dotenv jaisa package use na karo), wo kaam nahi karega.
// dotenv external npm package hai

// Express ek Node.js framework hai jo hume web server banane aur API create karne ka kaam easy bana deta hai.

// app.use(express.json()) ka matlab hai : Express ko bolo ki agar koi request JSON format me data bhej rahi hai, to us data ko automatically parse karke req.body me available kara do.

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("API is calling....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
