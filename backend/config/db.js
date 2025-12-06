import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_url);
        console.log(`Connected to MongoDB Database ${connection.connection.host}`.bgMagenta.white);
    }
    catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;