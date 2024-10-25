import { newRedis } from "../databases/redis";

export default class Redis {
  static async hset(key: string, object: Object, seconds?: number) {
    await newRedis.hset(key, object);
    if (seconds) {
      await newRedis.expire(key, seconds);
    }
  }
  static async set(key: string, value: Object, seconds?: number) {
    await newRedis.set(key, JSON.stringify(value));
    if (seconds) {
      await newRedis.expire(key, seconds);
    }
  }
  static async get(key: string): Promise<Object> {
    const data = await newRedis.get(key);
    return JSON.parse(data);
  }
  static async del(key: string) {
    return await newRedis.del(key);
  }
}
