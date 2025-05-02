import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );
        console.log(
            `MongoDB connected successfully: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit with failure
    }
};

export default connectToDb;
