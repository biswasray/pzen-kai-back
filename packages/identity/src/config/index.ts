import { Konnector } from "@pzen/universe";
export const konnector = Konnector(
  process.env.KAFKA_BOOTSTRAP_SERVERS || "kafka:9092",
);
