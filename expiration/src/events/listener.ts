import { Message } from "node-nats-streaming";
// import { OrderCreatedEvent } from "../../../common/src/events/allEvents";
// import { Listener } from "../../../common/src/events/base-listerner";
// import { Subjects } from "../../../common/src/events/subjects";
import { expirationQueue } from "../queues/expiration-queue";
import {OrderCreatedEvent,Listener,Subjects} from "@ashish_tickets/common"

export class OrderCreatedListerner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "expiration-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay=new Date(data.expiresAt).getTime()-new Date().getTime()
    // console.log("wauting this many milliseconds to process this job ",delay)
    // console.log("Event Datt!", data);
    await expirationQueue.add({
      orderId: data._id,
    },{
    delay  
    });
    msg.ack();
  }
}
