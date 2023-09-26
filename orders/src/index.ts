import { Stan } from "node-nats-streaming";
import app from "./app";
import startDatabase from "./db/db";
import { TicketCreatedListerner } from "./event/listener";
import { natsWrapper } from "./nats-wrapper";
import { randomBytes } from 'crypto';

const port = 8082;

// ticket:created


const startServer = async () => {
  try {
   await natsWrapper.connect("ticketing",randomBytes(4).toString("hex"),"http://localhost:4222")
    
   natsWrapper.client.on("close", () => {
      console.log("NATS connection close");
      process.exit();
    }); 
    
    process.on("SIGINT", () => natsWrapper.client.close());
    // use on macbook laptop
    // process.on("SIGTERM", () => natsWrapper.client.close());

    await startDatabase();
    app.listen(port, () => {
      console.log(`server is running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
