import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
const app = express();
import router from "./routes";
import { connectMongoDB } from "./databases/mongodb";
import { connectRedis } from "./databases/redis";
import errorHandler from "./middlewares/error.middleware";
import bodyParser = require("body-parser");
connectMongoDB();
connectRedis();
// app.use("/api", proxyMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("ok");
});
