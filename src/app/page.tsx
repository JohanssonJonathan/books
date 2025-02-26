'use client';
import { useQuery } from '@tanstack/react-query';
import { getBooksRoute } from './_frontend/util/apiIntegrations';
import LoadingSpinner from './_frontend/components/LoadingSpinner';
import BooksView from './_frontend/components/BooksView';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getBooksRoute(),
    queryKey: ['books'],
  });

  if (isError) {
    return (
      <div className="error-wrapper">
        <h3>Something went wrong, were not able to show books.</h3>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-center">
        <Link href="/create">Create a book</Link>
      </div>
      <BooksView books={data.books} />
    </>
  );
}
