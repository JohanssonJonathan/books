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
