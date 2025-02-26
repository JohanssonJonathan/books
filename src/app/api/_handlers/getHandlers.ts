import { MongoClient } from 'mongodb';
import { getBooks } from '@/app/api/_dbIntegration/crudoperations';

export const getBooksHandler = (client: MongoClient) => getBooks(client);
