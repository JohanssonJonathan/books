import { MongoClient } from 'mongodb';
import { dbUri } from '@/app/api/_util/consts';

export const connectDB = async () => {
  const client = new MongoClient(dbUri);

  return client
    .connect()
    .then(() => client)
    .catch((error) => {
      throw error;
    });
};

export const disconnectDB = async (client: MongoClient) => {
  return client.close();
};
