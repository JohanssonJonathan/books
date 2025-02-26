import { connectDB, disconnectDB } from '@/app/api/_dbIntegration/connection';
import { getBooksHandler } from './api/_handlers/getHandlers';
import { IBook } from '@/app/types';
import Container from '@/app/_frontend/components/Container';

export default async function Home() {
  let books: IBook[] = [];
  const dbClient = await connectDB().catch((error) =>
    console.error('DB connection: ', error.message)
  );

  if (dbClient) {
    books =
      (await getBooksHandler(dbClient).catch((error) => {
        console.error('Cant get books: ', error.message);
      })) || [];

    disconnectDB(dbClient);
  }
  return <Container books={JSON.parse(JSON.stringify(books))} />;
}

// db.collection('booksCollection').deleteMany({});
//
// db.booksCollection.insertOne({ hej: 'hej', title: 'hello', releaseDate: NumberInt(2020), author: 'Jonathan'})
//
// db.createCollection('booksCollection', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       title: 'Student Object Validation',
//       required: ['title', 'author', 'releaseDate', 'timestamp'],
//       properties: {
//         title: {
//           bsonType: 'string',
//           description: "'title' must be a string and is required",
//         },
//         releaseDate: {
//           bsonType: 'date',
//           description: 'date is required',
//         },
//         author: {
//           bsonType: 'string',
//           description: "'author' must be a string and is required",
//         },
//         timestamp: {
//           bsonType: 'date',
//           description: 'timestamp is required',
//         },
//       },
//     },
//   },
// });
//
//
