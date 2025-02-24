import { connectToDb } from './_util/dbIntegration';
import { getAllBooks } from './_util/handlers/getAllBooks';
import { IBook } from './_util/types/types';
import { Key } from 'react';
export default async function Home() {
  let books: IBook[] = [];
  const dbClient = await connectToDb().catch((error) =>
    console.error('DB connection: ', error.message)
  );

  if (dbClient) {
    books =
      (await getAllBooks(dbClient).catch((error) => {
        console.error('Cant get books: ', error.message);
      })) || [];
  }

  return (
    <div>
      {books.map(({ _id, title, author, releaseDate }) => {
        return (
          <div key={_id as unknown as Key}>
            <h2>{title}</h2>

            <h2>{author}</h2>

            <h2>{releaseDate}</h2>
          </div>
        );
      })}{' '}
    </div>
  );
}

// db.collection('booksCollection').deleteMany({});
//
// db.booksCollection.insertOne({ hej: 'hej', title: 'hello', releaseDate: NumberInt(2020), author: 'Jonathan'})
//
// db.createCollection("booksCollection", { validator: { $jsonSchema: { bsonType: "object", title: "Student Object Validation", required: [ "title", "author", "releaseDate" ], properties: { title: { bsonType: "string",
//                description: "'title' must be a string and is required"
//             },
//             releaseDate: {
//                bsonType: "int",
//                minimum: 1400,
//                maximum: 3017,
//                description: "'releaseDate' must be an integer in [ 1400, 3017 ] and is required"
//             },
//             author: {
//                bsonType: "string",
//                description: "'author' must be a string and is required"
//             }
//          }
//       }
//    }
// } )
