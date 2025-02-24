import { MongoClient } from 'mongodb';
import { databaseCredentials } from '@/app/_util/consts';
import { IBook } from './types/types';

export const connectToDb = async () => {
  const { password, user } = databaseCredentials;
  const uri = `mongodb+srv://${user}:${password}@cluster0.4v4ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const client = new MongoClient(uri);

  return client
    .connect()
    .then(() => client)
    .catch((error) => {
      throw error;
    });
};

export const getBooks = async (client: MongoClient) => {
  return client
    .db('books')
    .collection<IBook>('booksCollection')
    .find()
    .toArray()
    .catch((error) => {
      throw error;
    });
};

export const closeConnectionToDb = async (client: MongoClient) => {
  return client.close();
};
