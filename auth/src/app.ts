const express = require("express")
const authRoutes = require("../src/routes/auth.routes")
const cookieParser = require("cookie-parser")
const cors =require( "cors")
const app = express()
require("dotenv").config()

app.set('trust proxy',true)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}))
// Routes
app.use("/api/v1",authRoutes)

app.get("/", (req:any, res:any)=>{
    res.send("Hello World!")
})

import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        // stack: err.stack,
    });
};

app.use(errorHandler);

export default app