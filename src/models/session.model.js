import mongoose from "mongoose";

// Define conference session schema
const sessionSchema = new mongoose.Schema({
    
    username: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    roomcode: { type: String, required: true },
    trainername: { type: String, required: true }
});

// Create and export the model



export const Session = mongoose.model("Session", sessionSchema);
