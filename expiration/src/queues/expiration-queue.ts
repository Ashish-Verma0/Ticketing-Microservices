import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publisher";
import { natsWrapper } from "../nats-wrapper";

interface payload {
  orderId: string;
}

const expirationQueue = new Queue<payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST || "expiration-redis-srv",
  },    
});

const data=async()=>{
  try {
    let res=await expirationQueue.add({orderId:"hello"})
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
data()

expirationQueue.process(async (job) => {
  console.log("I want to publish an expiration:complete event for orderId", job.data.orderId);
   new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId:job.data.orderId
   })
});

export { expirationQueue }
