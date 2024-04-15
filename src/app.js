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
import blogRouter from "./routes/blog.routes.js";
import adminRouter from "./routes/admin.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
dotenv.config();
const URL = process.env.CORS_ORIGIN;
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public/temp"));

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

// Blog routes
app.use("/api/v1/blog", blogRouter);

// Admin routes
app.use("/api/v1/admin", adminRouter);

// Cart routes
app.use("/api/v1/cart", cartRouter);

// Order routes
app.use("/api/v1/order", orderRouter);

export { app };
