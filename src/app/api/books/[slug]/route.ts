import { NextRequest } from 'next/server';
import { connectDB, disconnectDB } from '@/app/api/_dbIntegration/connection';
import { deleteBookHandler } from '@/app/api/_handlers/deleteHandlers';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const dbClient = await connectDB().catch((error) =>
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
        disconnectDB(dbClient);
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
      disconnectDB(dbClient);

      const currentError = error as unknown as Error;

      console.error('Error:', currentError.message); // Log the full error
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
