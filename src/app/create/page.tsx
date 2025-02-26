'use client';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import './style.css';
import { createBookRoute } from '@/app/_frontend/util/apiIntegrations';
import getDateString from '@/app/_frontend/util/getDateString';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

const CreateBook = () => {
  const { isError, mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: createBookRoute,
    onSuccess: () => {
      setNewBook(() => ({
        title: '',
        author: '',
        releaseDate: '',
      }));

      setTimeout(() => reset(), 5000);
    },
  });

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    releaseDate: '',
  });

  const { title, author, releaseDate } = newBook;
  const isDisabled = !title || !author || !releaseDate || isPending;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewBook((newBook) => ({
      ...newBook,
      [name]: value,
    }));
  };

  const handleForm = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    mutate({
      title,
      author,
      releaseDate,
    });
  };

  return (
    <>
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

          <div>{isError && 'Something went wrong try again'}</div>
          <input
            disabled={Boolean(isDisabled)}
            type="submit"
            value={
              isPending ? 'Loading' : isSuccess ? 'Book added' : 'Add book'
            }
          />
        </form>
      </div>
      <div className="flex flex-center">
        <Link href="/">Go Back</Link>
      </div>
    </>
  );
};

export default CreateBook;
