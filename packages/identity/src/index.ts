import express from "express";
import kafka from "kafka-node";
const app = express();
app.use(express.json());
console.log("port", process.env.PORT);
app.listen(process.env.PORT);
