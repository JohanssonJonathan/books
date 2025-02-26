import { IBook } from '@/app/types';
import { ObjectId } from 'mongodb';

export const createBookRoute = ({
  title,
  author,
  releaseDate,
}: Omit<IBook, '_id'>) =>
  fetch(`/api/books`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      author,
      releaseDate,
    }),
  }).then((response) => {
    if (response.ok && response.status === 200) {
      return response.json();
    }

    throw new Error('Something wrong');
  });

export const deleteBookRoute = (id: ObjectId) =>
  fetch(`/api/books/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.ok && response.status === 200) {
      return response.json();
    }

    throw new Error('Something wrong');
  });

export const getBooksRoute = () =>
  fetch(`/api/books`, { cache: 'no-cache' }).then((response) => {
    if (response.ok && response.status === 200) {
      return response.json();
    }

    throw new Error('Something wrong');
  });
