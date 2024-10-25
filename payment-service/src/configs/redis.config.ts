interface IRedisConfig {
  port: number;
  host: string;
  password: string;
}

export const RedisConfig: IRedisConfig = {
  port: Number.parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};
