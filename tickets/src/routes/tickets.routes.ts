import express from "express";
import { verifyToken } from "../../../common/src/verifyToken";

import {
  createTicket,
  getAllTicket,
  getTicketById,
  updateTickets,
  usersOrderTickets,
} from "../controller/tickets.controller";

const ticketRoutes = express.Router();

ticketRoutes.post("/create", verifyToken, createTicket);
ticketRoutes.get("/allTickets", getAllTicket);
ticketRoutes.get("/ticket/:id", verifyToken, getTicketById);
ticketRoutes.put("/ticket/update/:id", verifyToken, updateTickets);
ticketRoutes.get("/user/ticket/:id", verifyToken, usersOrderTickets);

export default ticketRoutes;
