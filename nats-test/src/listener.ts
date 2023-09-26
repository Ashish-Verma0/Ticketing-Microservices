import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListerner, TicketUpdatedListerner } from "./events/ticket-creation-listerner";

// console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("close", () => {
  console.log("NATS connection close");
  process.exit();
});


stan.on("connect", () => {
  console.clear()
  console.log("Listener Connected to NATS");
 new TicketCreatedListerner(stan).listen()
 new TicketUpdatedListerner(stan).listen()
});

process.on("SIGINT", () => stan.close());



