import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

// console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "nats://localhost:4222",
});


stan.on("connect", async () => {
  console.log("Publisher connected to Nats Streaming Server");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
      userId:"xkabsjhbakjb"
    });
  } catch (error) {
    console.log(error);
  }
});

stan.on("error",(err)=>{
  console.log(err)
})
