import express from "express";
import kafka from "kafka-node";
const app = express();
app.use(express.json());

app.listen(process.env.PORT);
