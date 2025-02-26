import { MongoClient } from 'mongodb';
import { createBook } from '@/app/api/_dbIntegration/crudoperations';
import { IBook } from '@/app/types';

export const createBookHandler = (
  client: MongoClient,
  book: Omit<IBook, '_id'>
) => createBook(client, book);
