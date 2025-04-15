import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
      unique: true,
    },
    date: { type: String },
    overview: { type: String },
  },
});

/* Be careful when creating a new TABLE:
      - have to: run npm run migration:generate --name=nameOfTheMigraiton
      - have to: run npm migration:run <3 (or else, the table would not be created)
*/

export default Movie;
