import { Message } from "node-nats-streaming";
import { OrderCreatedEvent } from "../../../common/src/events/allEvents";
import { Listener } from "../../../common/src/events/base-listerner";
import { Subjects } from "../../../common/src/events/subjects";
// import { expirationQueue } from "../queues/expiration-queue";
export class OrderCreatedListerner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "expiration-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event Datt!", data);
    // await expirationQueue.add({
    //   orderId: data._id,
    //   // orderId: "ashish",
    // });
    // msg.ack();
  }
}
