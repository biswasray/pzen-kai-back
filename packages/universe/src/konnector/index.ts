import kafka from "kafka-node";
import PlatformError from "platform-error";
export default function Konnector(kafkaHost: string) {
  let isProducerReady = false;
  const client = new kafka.KafkaClient({
    kafkaHost,
  });

  const producer = new kafka.Producer(client);
  producer.on("ready", () => {
    isProducerReady = true;
  });

  function checkProducerStatus() {
    if (!isProducerReady) {
      throw new PlatformError("Unprocessable Entity", {
        messages: ["producer is not ready yet"],
      });
    }
  }

  function createTopics(topicName: string, async?: boolean): Promise<unknown>;
  function createTopics(topicName: string[], async?: boolean): Promise<unknown>;
  function createTopics(topicName: string | string[], async = true) {
    checkProducerStatus();
    return new Promise<unknown>((resolve, reject) => {
      if (typeof topicName === "string") {
        producer.createTopics([topicName], async, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      } else {
        producer.createTopics(topicName, async, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      }
    });
  }
  function sendMessage(payloads: kafka.ProduceRequest[]) {
    checkProducerStatus();
    return new Promise<unknown>((resolve, reject) => {
      producer.send(payloads, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  function close() {
    checkProducerStatus();
    return new Promise<void>((resolve) => {
      producer.close(() => {
        resolve();
      });
    });
  }

  function publish(topicName: string, data: Record<string, unknown>) {
    checkProducerStatus();
    return sendMessage([
      {
        topic: topicName,
        messages: JSON.stringify(data),
      },
    ]);
  }

  function subscribe(
    topicName: string,
    listener: (data: Record<string, unknown>) => void,
  ) {
    const consumer = new kafka.Consumer(client, [{ topic: topicName }], {
      autoCommit: false,
    });
    consumer.on("message", (message) => {
      if (typeof message.value === "string") {
        listener(JSON.parse(message.value));
      } else {
        listener(JSON.parse(message.value.toString()));
      }
    });

    consumer.on("error", (err) => {
      if (err instanceof Error) {
        throw err;
      }
      throw new PlatformError("Internal Server Error", {
        resource: "Consumer",
      });
    });
  }

  return {
    createTopics,
    sendMessage,
    close,
    publish,
    subscribe,
  };
}
