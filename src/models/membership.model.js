import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({});

export const Membership = mongoose.model("Membership", membershipSchema);
