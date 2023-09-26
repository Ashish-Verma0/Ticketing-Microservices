import express from "express"
import { createOrder, deleteOrderById, findUserOrders, getOrderById, getOrders } from "../controllers/orders.controllers"
import {verifyToken} from "../verifyToken"
const orderRouter=express.Router()

orderRouter.post("/create",verifyToken,createOrder)
orderRouter.get("/all/orders",getOrders)
orderRouter.get("/user/orders",verifyToken,findUserOrders)
orderRouter.get("/order/:id",getOrderById)
orderRouter.put("/delete/order/:id",deleteOrderById)

export default orderRouter

