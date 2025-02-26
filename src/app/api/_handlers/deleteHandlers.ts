import { MongoClient } from 'mongodb';
import { deleteBook } from '@/app/api/_dbIntegration/crudoperations';

export const deleteBookHandler = (client: MongoClient, id: string) =>
  deleteBook(client, id);
