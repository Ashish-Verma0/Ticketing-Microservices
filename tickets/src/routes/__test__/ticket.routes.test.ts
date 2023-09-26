import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";

jest.mock("../../nats-wrapper")

it("returns an error if the ticket does not exists", async()=>{
   const ticketId= new mongoose.Types.ObjectId()

   await request(app)
   .post("/api/orders")
   .set("Cookie",(global as any).signin())
   .send({ticketId})
   .expect(404)
})
it("returns an error if the ticket is already reserved", async()=>{

})
it("reserve a ticket", async()=>{

})



