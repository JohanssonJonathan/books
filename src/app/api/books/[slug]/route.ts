import { NextRequest } from 'next/server';
import { closeConnectionToDb, connectToDb } from '@/app/_util/dbIntegration';
import { deleteBookHandler } from '@/app/_util/handlers/deleteBookHandler';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const dbClient = await connectToDb().catch((error) =>
    console.error('DB connection: ', error.message)
  );

  const slug = (await params).slug;

  if (dbClient) {
    try {
      const { acknowledged, deletedCount } = await deleteBookHandler(
        dbClient,
        slug
      );

      if (acknowledged) {
        closeConnectionToDb(dbClient);
        if (deletedCount) {
          return new Response(
            JSON.stringify({
              message: 'Resource deleted successfully',
              id: slug,
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(
          JSON.stringify({
            message: 'Not found',
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (error) {
      closeConnectionToDb(dbClient);

      console.error('Error caught:', error); // Log the full error
      const currentError = error as unknown as Error;

      if (currentError.message.includes('24 character hex string')) {
        return new Response(JSON.stringify({ message: 'Invalid id' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }

  return new Response(JSON.stringify({ message: 'Internal server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
