import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public/temp"));
app.use(cookieParser());

// routes

app.get("/", (req,res) => {
    res.send("This is fitvista backend")
})

export { app };