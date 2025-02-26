import { NextRequest } from 'next/server';
import { connectDB, disconnectDB } from '@/app/api/_dbIntegration/connection';
import { createBookHandler } from '@/app/api/_handlers/createHandlers';

export async function GET() {
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const { title, author, releaseDate, ...rest } = await req.json();

  const dbClient = await connectDB().catch((error) =>
    console.error('DB connection: ', error.message)
  );

  if (dbClient) {
    try {
      if (!title || !author || !releaseDate) throw new Error('incomplete body');
      if (Object.keys(rest).length) throw new Error('invalid body');
      if (new Date(releaseDate).toString() === 'Invalid Date')
        throw new Error('invalid date');

      const { acknowledged, insertedId } = await createBookHandler(dbClient, {
        title,
        author,
        releaseDate: new Date(releaseDate),
        timestamp: new Date(),
      });

      disconnectDB(dbClient);
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
      disconnectDB(dbClient);
      const currentError = error as unknown as Error;

      if (currentError.message === 'invalid date') {
        return new Response(
          JSON.stringify({
            message: 'Invalid date',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

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
