import { natsWrapper } from "./nats-wrapper";
import { randomBytes } from 'crypto';

const startServer = async () => {
  try {
    await natsWrapper.connect("ticketing","aashishhh","http://localhost:4222")

    natsWrapper.client.on("close", () => {
      console.log("NATS connection close");
      process.exit();
    }); 
    
    process.on("SIGINT", () => natsWrapper.client.close());
  } catch (error) {
    console.log(error);
  }
};

startServer();
