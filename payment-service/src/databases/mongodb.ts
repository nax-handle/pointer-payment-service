import mongoose from "mongoose";
import { MongoDBConfig } from "../configs/mongodb.config";
export const connectMongoDB = () => {
  mongoose
    .connect(MongoDBConfig.uri)
    .then(() => {
      console.log("\x1b[35m%s\x1b[0m", "Connected MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
