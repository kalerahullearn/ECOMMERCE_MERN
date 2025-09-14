import mongoose from "mongoose"

export const connectDb = async (MONGO_URI) => {
    mongoose.connect(MONGO_URI)
}