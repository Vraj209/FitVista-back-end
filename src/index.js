import mongoose from "mongoose";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";


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
