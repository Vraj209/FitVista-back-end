import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import bodyParser from "body-parser";
import paypal from "paypal-rest-sdk";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public/temp"));
app.use(cookieParser());

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AbVFhUp15XX72t3NY-WGW9OJUv5cN0hJfIhLDJkDRj-psh8vsmtWR2wQ2TW6cNL5HE6bHfuVTzGGMv14",
  client_secret:
    "EC0xQihBCor9xICx-YJJh0fUpClXRIbtHb9bHRS69Clwl22O-eZKi9K-ickI5nSZ-Z3jEGBdrTg4PzKq",
});
app.use(
  expressSession({
    secret: "fitvista",
  })
);

// routes
app.get("/", (req, res) => {
  console.log(req.session.userid);
  res.send("This is fitvista backend");
});

// User routes
app.use("/api/v1/users", userRouter);
// Product routes
app.use("/api/v1/product", productRouter);
// Payment routes
app.use("/api/v1/payment", paymentRouter);

export { app };
