import express from "express";
import { ErrorRequestHandler, Request, Response } from "express";
import orderRouter from "./routes/orders.routes";
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser({secure:false}));
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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

export default app;
