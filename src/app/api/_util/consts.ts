const databaseCredentials = {
  user: 'books',
  password: process.env.MONGODB_PASSWORD,
};

export const dbName = 'books';
export const collection = 'booksCollection';

export const dbUri = `mongodb+srv://${databaseCredentials.user}:${databaseCredentials.password}@cluster0.4v4ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
