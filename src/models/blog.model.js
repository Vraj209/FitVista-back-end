import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
