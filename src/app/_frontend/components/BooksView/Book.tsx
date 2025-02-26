import { IBook as IDefaultBook } from '@/app/types';
import { deleteBookRoute } from '../../util/apiIntegrations';
import getDateString from '../../util/getDateString';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IBook {
  book: IDefaultBook;
}

const Book = ({ book }: IBook) => {
  const queryClient = useQueryClient();

  const { isError, mutate, isPending } = useMutation({
    mutationFn: deleteBookRoute,
    onSuccess: ({ id }) => {
      queryClient.setQueryData(['books'], (data: { books: IDefaultBook[] }) => {
        return {
          books: data.books.filter((book) => book._id !== id),
        };
      });
    },
  });

  return (
    <div className="grid-item">
      <div className="grid-item-content">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Release Date: {getDateString(book.releaseDate)}</p>
      </div>
      <button
        className="close-button"
        disabled={isError}
        onClick={() => mutate(book._id)}
      >
        &times;
      </button>
      {isPending && <div className="spinner"></div>}
    </div>
  );
};

export default Book;
