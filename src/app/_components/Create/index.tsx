'use client';
import '@/app/BooksGrid.css';

const Create = () => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setNewBook({ ...newBook, [name]: value });
  };

  const handleCreateBook = () => {
    // setBooks([
    //   ...books,
    //   { ...newBook, releaseDate: parseInt(newBook.releaseDate) },
    // ]);
    // setNewBook({ title: '', author: '', releaseDate: '' });
  };
  return (
    <div className="form-container">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="releaseDate"
        placeholder="Release Date"
        onChange={handleInputChange}
      />
      <button onClick={handleCreateBook}>Create</button>
    </div>
  );
};

export default Create;
