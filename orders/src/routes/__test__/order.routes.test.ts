import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import orderDatabase from "../../models/orders.model";
import ticketDatabase from "../../models/ticket.model";
// import { OrderStatus } from "../../../../common/src/types/order-status";
import {OrderStatus} from "@ashish_tickets/common"
jest.mock("../../nats-wrapper")

it("returns an error if the ticket does not exists", async()=>{
   const ticketId= new mongoose.Types.ObjectId()

   await request(app)
   .post("/api/orders")
   // .set('Cookie', (global as any).signin())
   .set("Cookie", (global as any).signin())
   .send({ticketId})
   .expect(404)
})
it("returns an error if the ticket is already reserved", async()=>{
const ticket=await ticketDatabase.create({
   title:"concert",
   price:20
})
 console.log(ticket)
const order=await orderDatabase.create({
   ticket,
   userId:"djbkdbfkfewh",
   status:OrderStatus.Created,
   expiresAt:new Date()
})
await request(app)
.post("/api/orders")
// .set('Cookie', (global as any).signin())
.set("Cookie", (global as any).signin())
.send({ticketId:ticket._id})
.expect(400)
})
it("reserve a ticket", async()=>{
   const ticket=await ticketDatabase.create({
      title:"concert",
      price:20
   })
   await request(app)
.post("/api/orders/create")
// .set('Cookie', (global as any).signin())
.set("Cookie", (global as any).signin())
.send({ticketId:ticket._id})
.expect(201)
})



