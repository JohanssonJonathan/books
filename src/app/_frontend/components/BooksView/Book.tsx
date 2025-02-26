import { IBook as IDefaultBook } from '@/app/types';
import { ObjectId } from 'mongodb';
import { useState } from 'react';
import { deleteBookRoute } from '../../util/apiIntegrations';
import getDateString from '../../util/getDateString';

interface IBook {
  book: IDefaultBook;
  bookRemovedCallback: (id: ObjectId) => void;
}
const Book = ({ book, bookRemovedCallback }: IBook) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const removeBook = (id: ObjectId) => {
    setLoading(true);
    deleteBookRoute(id)
      .then(({ id }) => bookRemovedCallback(id))
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setError('Could not remove book');

        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <div className="grid-item">
      <div className="grid-item-content">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Release Date: {getDateString(book.releaseDate)}</p>
      </div>
      <button
        className="close-button"
        disabled={Boolean(error)}
        onClick={() => removeBook(book._id)}
      >
        &times;
      </button>
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default Book;
