import { NextRequest } from 'next/server';
import { createBookHandler } from '@/app/_util/handlers/createBookHandler';
import { closeConnectionToDb, connectToDb } from '@/app/_util/dbIntegration';

export async function GET() {
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const { title, author, releaseDate, ...rest } = await req.json();

  const dbClient = await connectToDb().catch((error) =>
    console.error('DB connection: ', error.message)
  );

  if (dbClient) {
    try {
      if (Object.keys(rest).length) throw new Error('invalid body');
      if (!title || !author || !releaseDate) throw new Error('incomplete body');

      const { acknowledged, insertedId } = await createBookHandler(dbClient, {
        title,
        author,
        releaseDate,
      });

      closeConnectionToDb(dbClient);
      if (acknowledged && insertedId) {
        return new Response(
          JSON.stringify({
            message: 'Resource created successfully',
            id: insertedId,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (error) {
      closeConnectionToDb(dbClient);
      const currentError = error as unknown as Error;

      if (currentError.message === 'invalid body') {
        return new Response(
          JSON.stringify({
            message: 'Valid properties are title, author and releaseDate',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      if (currentError.message === 'incomplete body') {
        const currentBodyProperties: {
          title: string;
          author: string;
          releaseDate: string;
        } = {
          title,
          author,
          releaseDate,
        };

        type TCurrentBodyKeys = 'title' | 'author' | 'releaseDate';
        const keys = Object.keys(currentBodyProperties) as TCurrentBodyKeys[];

        const values = keys
          .map((key) => {
            if (!currentBodyProperties[key]) {
              return key;
            }
            return false;
          })
          .filter((key) => key)
          .join(', ');

        return new Response(
          JSON.stringify({
            message: `You did not pass ${values}`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      if (currentError.message.includes('validation')) {
        return new Response(
          JSON.stringify({
            message:
              'Did not pass validation. Make sure values are passed with correct values.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  }

  return new Response(JSON.stringify({ message: 'Internal server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
