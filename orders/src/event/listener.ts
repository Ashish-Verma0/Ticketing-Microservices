import { Message } from "node-nats-streaming";
// import {
//   TicketCreatedEvent,
//   TicketUpdatedEvent,
//   ExpirationCompleteEvent
// } from "../../../common/src/events/allEvents";
// import { Listener } from "../../../common/src/events/base-listerner";
// import { Subjects } from "../../../common/src/events/subjects";
// import { OrderStatus } from "../../../common/src/types/order-status";
import ticketsdatabases from "../models/ticket.model";
import orderDatabase from "../models/orders.model"
import { OrderCancelledPublisher } from "./publisher";
import { natsWrapper } from "../nats-wrapper";
import {Listener,Subjects,OrderStatus,TicketCreatedEvent,TicketUpdatedEvent,ExpirationCompleteEvent} from "@ashish_tickets/common"
export class TicketCreatedListerner extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event Datt!", data);

    await ticketsdatabases.create({
      _id: data.id,
      title: data.title,
      price: data.price,
    });
    msg.ack();
  }
}
export class TicketUpdatedListerner extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = "orders-service";

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    console.log("Event Datt!", data);
  //  const tickets=await ticketsdatabases.findOne({
  //   _id:data.id,
  //   version:data.version-1
  //  })
  //  if(!tickets){
  //   return new Error("Ticket not found")
  //  }
   let ticket= await ticketsdatabases.findByIdAndUpdate(
     data.id,
     {$set:{ title: data.title, price: data.price} },
     { new: true }
     );
     if(!ticket){
       return new Error("Ticket not found")
      }
      //  tickets.set({ title: data.title, price: data.price})
      //  await tickets.save()
    msg.ack();
  }
}


export class ExpirationCompleteListerner extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = "orders-service";

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    console.log("Event Datt!", data);
const order=await orderDatabase.findByIdAndUpdate(data.orderId,{
status:OrderStatus.Cancelled,
ticket:null
},{
  new:true
})

await new OrderCancelledPublisher(natsWrapper.client).publish({
  _id:order!._id,
  version:order!.version,
  ticket:{
    _id:order!.ticket!._id!,
  }
})
    msg.ack();
  }
}