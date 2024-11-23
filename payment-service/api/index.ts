import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
const app = express();
import router from "../src/routes";
import { connectMongoDB } from "../src/databases/mongodb";
import { connectRedis } from "../src/databases/redis";
import errorHandler from "../src/middlewares/error.middleware";
import bodyParser from "body-parser";
import cors from "cors";
connectMongoDB();
connectRedis();
// app.use("/api", proxyMiddleware);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
