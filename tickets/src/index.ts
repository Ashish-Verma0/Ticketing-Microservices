import app from "./app";
import startDatabase from "./db/db";
import { natsWrapper } from "./nats-wrapper";

const port = 8081;

const startServer = async () => {
  try {
    await natsWrapper.connect("ticketing","ashish","http://localhost:4222")

    natsWrapper.client.on("close", () => {
      console.log("NATS connection close");
      process.exit();
    }); 
    
    process.on("SIGINT", () => natsWrapper.client.close());

    await startDatabase();
    app.listen(port, () => {
      console.log(`server is running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
