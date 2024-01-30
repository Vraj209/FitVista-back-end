import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";
import cors from "cors";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection :: ", error);
  });
