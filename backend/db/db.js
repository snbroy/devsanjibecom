import mongoose from "mongoose";

const connectToDatabase = async() =>{
    console.log(process.env.MONGO_DB_URL)
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase;