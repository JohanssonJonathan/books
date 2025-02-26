'use client';
import { IBook } from '@/app/types';
import CreateBook from '@/app/_frontend/components/CreateBook';
import { useState } from 'react';
import BooksView from './BooksView';
import { ObjectId } from 'mongodb';

interface IBooks {
  books: IBook[];
}

const Container = ({ books }: IBooks) => {
  const [currentBooks, setCurrentBooks] = useState(books);

  const newBookAddedCallback = (book: IBook) => {
    setCurrentBooks((previousBooks) => [book, ...previousBooks]);
  };

  const bookRemovedCallback = (id: ObjectId) => {
    setCurrentBooks((previousBooks) => [
      ...previousBooks.filter((book) => book._id !== id),
    ]);
  };

  return (
    <>
      <CreateBook newBookAddedCallback={newBookAddedCallback} />
      <BooksView
        bookRemovedCallback={bookRemovedCallback}
        books={currentBooks}
      />
    </>
  );
};

export default Container;
