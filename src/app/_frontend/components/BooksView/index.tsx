import { IBook } from '@/app/types';
import './style.css';
import Book from './Book';

interface IBooks {
  books: IBook[];
}

const BooksView = ({ books }: IBooks) => (
  <div className="grid-wrapper">
    <div className="grid-container">
      {books.map((book) => (
        <Book key={book._id as unknown as string} book={book} />
      ))}
    </div>
  </div>
);

export default BooksView;
