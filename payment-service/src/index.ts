import { configDotenv } from "dotenv";
configDotenv();
import express, { Response, Request } from "express";
const app = express();
import router from "./routes";
import { connectMongoDB } from "./databases/mongodb";
import { connectRedis } from "./databases/redis";
import errorHandler from "./middlewares/error.middleware";
import bodyParser = require("body-parser");
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
