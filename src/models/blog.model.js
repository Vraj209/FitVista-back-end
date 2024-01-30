import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({});

export const Blog = mongoose.model("Blog", blogSchema);
