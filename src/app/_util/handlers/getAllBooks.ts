import { MongoClient } from 'mongodb';
import { getBooks } from '../dbIntegration';
export const getAllBooks = (client: MongoClient) => getBooks(client);
