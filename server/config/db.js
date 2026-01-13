import mongoose from 'mongoose';

// this function is used to connect to the MongoDB database -> take the MongoDB URI from the environment variables and connect to the database
const connectDB = async() => {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch(error){
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }

}; 

export default connectDB;