import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "nats://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to Nats");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:creation", data, () => {
    console.log("Events Published");
  });
});
