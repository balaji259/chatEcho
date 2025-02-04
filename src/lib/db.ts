import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;
console.log(MONGO_URI);
console.log(process.env.MONGO_URI);

if (MONGO_URI) {
    throw new Error("Please enter the Mongo URI!");
}

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDb Connected!");
    }
    catch (e) {
        console.log("MongoDB connection error!", e);
    }
}

export default connectDB;