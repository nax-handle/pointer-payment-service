import Redis from "ioredis";
import { RedisConfig } from "../configs/redis.config";

export const newRedis = new Redis(RedisConfig);
export const connectRedis = () => {
  newRedis.on("ready", () => {
    console.log("\x1b[31m%s\x1b[0m", "Redis is ready and connected!");
  });
  newRedis.on("error", (err) => {
    console.log("Redis connection error:", err);
  });
};
