import express from "express";
import { verifyToken } from "../../../common/src/verifyToken";
import {
  LoginUser,
  createUser,
  signIn,
  signOut,
} from "../controller/auth.controller";
// const {createUser,signIn,LoginUser,signOut} =require("../controller/auth.controller.ts")
const authRoutes = express.Router();

authRoutes.post("/", createUser);
authRoutes.post("/login", signIn);
authRoutes.get("/me", verifyToken, LoginUser);
authRoutes.post("/signOut", signOut);

module.exports = authRoutes;
