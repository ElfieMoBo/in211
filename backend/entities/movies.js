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
    release_date: { type: Date },
    overview: { type: String },
    runtime: { type: Number },
    limited_age: { type: Number },
    // poster_path: { type: String },
    // genre_ids: { type: Array },
  },
});

/* Be careful when creating/updating a new TABLE:
      - have to: run npm run migration:generate --name=nameOfTheMigraiton
      - have to: run npm migration:run <3 (or else, the table would not be created)
*/

export default Movie;
