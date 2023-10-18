import { Message } from "node-nats-streaming";
// import { OrderCancelledEvent, OrderCreatedEvent } from "../../../common/src/events/allEvents";
// import { Subjects } from "../../../common/src/events/subjects";
// import { Listener } from "../../../common/src/events/base-listerner";
import ticketDatabase from "../model/tickets.model";
import { TicketUpdatedPublisher } from "./ticket-publisher";

import {OrderCancelledEvent,OrderCreatedEvent,Subjects,Listener} from "@ashish_tickets/common"

// ye oreder service se data aa raha hai
export class OrderCreatedListerner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "tickets-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event Datt!", data);
    const ticket = await ticketDatabase.findByIdAndUpdate(
      data.ticket,
      {
        orderId: data._id,
      },
      {
        new: true,
      }
    );

    if (!ticket) {
      throw new Error("ticket not found");
    }
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket._id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    msg.ack();
  }
}
export class OrderCancelledListerner extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "tickets-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log("Event Datt!", data);
    const ticket = await ticketDatabase.findByIdAndUpdate(
      data.ticket,
      {
        orderId: undefined,
      },
      {
        new: true,
      }
    );

    if (!ticket) {
      throw new Error("ticket not found");
    }
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket._id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    msg.ack();
  }
}
