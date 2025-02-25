import { MongoClient } from 'mongodb';
import { createBook } from '../dbIntegration';
import { IBook } from '../types/types';

export const createBookHandler = (
  client: MongoClient,
  book: Omit<IBook, '_id'>
) => createBook(client, book);
