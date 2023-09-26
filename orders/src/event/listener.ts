import { Message } from "node-nats-streaming";
import {
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from "../../../common/src/events/allEvents";
import { Listener } from "../../../common/src/events/base-listerner";
import { Subjects } from "../../../common/src/events/subjects";
import ticketsdatabases from "../models/ticket.model";
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
