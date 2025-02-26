import { IBook } from '@/app/types';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import './style.css';
import { createBookRoute } from '@/app/_frontend/util/apiIntegrations';
import getDateString from '../../util/getDateString';

interface ICreateBook {
  newBookAddedCallback: (book: IBook) => void;
}
const CreateBook = ({ newBookAddedCallback }: ICreateBook) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    releaseDate: '',
  });

  const { title, author, releaseDate } = newBook;
  const isDisabled = !title || !author || !releaseDate || loading;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewBook((newBook) => ({
      ...newBook,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleForm = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setLoading(true);

    createBookRoute({ title, author, releaseDate })
      .then((data) => {
        newBookAddedCallback({ title, author, releaseDate, _id: data.id });

        setLoading(false);
        setNewBook(() => ({
          title: '',
          author: '',
          releaseDate: '',
        }));
      })
      .catch((err) => {
        setLoading(false);
        setError('Something went wrong, please try again');

        setTimeout(() => {
          setError('');
        }, 5000);
        console.error('err: ', err);
      });
  };

  return (
    <div className="create-wrapper">
      <form className="form-container" onSubmit={handleForm}>
        <input
          type="text"
          name="title"
          minLength={3}
          value={title}
          placeholder={'Title'}
          onChange={handleInputChange}
        />
        <input
          type="text"
          minLength={3}
          name="author"
          placeholder="Author"
          value={author}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="releaseDate"
          min="1400-01-01"
          max={getDateString()}
          placeholder="Release Date"
          value={releaseDate}
          onChange={handleInputChange}
        />

        <div>{error}</div>
        <input
          disabled={Boolean(isDisabled)}
          type="submit"
          value={loading ? 'Loading' : 'Add book'}
        />
      </form>
    </div>
  );
};

export default CreateBook;
