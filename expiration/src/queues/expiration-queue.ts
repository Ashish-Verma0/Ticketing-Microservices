import Queue from "bull";

interface payload {
  orderId: string;
}
// console.log("ashishhhhhhhh",process.env.REDIS_HOST)
const expirationQueue = new Queue<payload>("order:expiration", {
  redis: {
    host: "expiration-redis-srv",
    port:6379
  },    
});

expirationQueue.process(async (job) => {
  console.log("ashishhh", job.data);
  console.log(
    "I want to publish an expiration:complete event for orderId",
    job.data.orderId
  );
});

// Add a test job to the queue
expirationQueue.add({ orderId: "test" });

// export { expirationQueue }



