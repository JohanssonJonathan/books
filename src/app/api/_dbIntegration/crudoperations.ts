import { MongoClient, ObjectId } from 'mongodb';
import { IBook } from '@/app/types';
import { dbName, collection } from '../_util/consts';

export const getBooks = async (client: MongoClient) => {
  return client
    .db(dbName)
    .collection<IBook>(collection)
    .find()
    .sort({ timestamp: -1 })
    .toArray()
    .catch((error) => {
      throw error;
    });
};

export const deleteBook = async (client: MongoClient, id: string) => {
  return client
    .db(dbName)
    .collection<IBook>(collection)
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
    .db(dbName)
    .collection<Omit<IBook, '_id'>>(collection)
    .insertOne(book)
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};
