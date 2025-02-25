import { MongoClient, ObjectId } from 'mongodb';
import { databaseCredentials } from '@/app/_util/consts';
import { IBook } from './types/types';

const getCollection = (client: MongoClient) =>
  client.db('books').collection<IBook>('booksCollection');

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
  return getCollection(client)
    .find()
    .toArray()
    .catch((error) => {
      throw error;
    });
};

export const deleteBook = async (client: MongoClient, id: string) => {
  return getCollection(client)
    .deleteOne({ _id: new ObjectId(id) })
    .catch((error) => {
      throw error;
    });
};

export const createBook = async (
  client: MongoClient,
  book: Omit<IBook, '_id'>
) => {
  return client
    .db('books')
    .collection<Omit<IBook, '_id'>>('booksCollection')
    .insertOne(book)
    .catch((error) => {
      throw error;
    });
};
export const closeConnectionToDb = async (client: MongoClient) => {
  return client.close();
};
