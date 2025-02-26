import { WithId, Document } from 'mongodb';

export interface IBook extends WithId<Document> {
  title: string;
  author: string;
  releaseDate: string;
}
