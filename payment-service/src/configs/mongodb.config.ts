interface IConfig {
  uri: string | undefined;
}
export const MongoDBConfig: IConfig = {
  uri: process.env.MONGODB_URI,
};
