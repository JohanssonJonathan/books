import { MongoClient } from 'mongodb';
import { deleteBook } from '../dbIntegration';

export const deleteBookHandler = (client: MongoClient, id: string) =>
  deleteBook(client, id);
