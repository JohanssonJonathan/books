import { IBook } from '@/app/types';
import './style.css';
import { ObjectId } from 'mongodb';
import Book from './Book';

interface IBooks {
  books: IBook[];
  bookRemovedCallback: (id: ObjectId) => void;
}

const BooksView = ({ books, bookRemovedCallback }: IBooks) => (
  <div className="grid-wrapper">
    <div className="grid-container">
      {books.map((book) => (
        <Book
          key={book._id as unknown as string}
          bookRemovedCallback={bookRemovedCallback}
          book={book}
        />
      ))}
    </div>
  </div>
);

export default BooksView;
