import express from "express";
import {
  LoginUser,
  createUser,
  signIn,
  signOut,
} from "../controller/auth.controller";
// import {verifyToken} from "../../../common/src/verifyToken"
import { verifyToken } from "@ashish_tickets/common";


const authRoutes = express.Router();

authRoutes.post("/signup", createUser);
authRoutes.post("/login", signIn);
authRoutes.get("/me", verifyToken, LoginUser);
authRoutes.post("/signOut", signOut);

module.exports = authRoutes;
