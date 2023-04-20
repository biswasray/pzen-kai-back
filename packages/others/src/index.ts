import express from "express";
import kafka from "kafka-node";
import { logger } from "@pzen/universe";
const app = express();

app.use(express.json());

const isRunning = () => {
  const client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
  });
  console.log(client);
  const consumer = new kafka.Consumer(
    client,
    [{ topic: process.env.KAFKA_TOPIC || "topic1" }],
    {
      autoCommit: false,
    },
  );

  consumer.on("message", async (message) => {
    logger.log(message.value as string);
  });

  consumer.on("error", (err) => {
    console.log(err);
  });
};
setTimeout(isRunning, 4000);

app.listen(process.env.PORT);
