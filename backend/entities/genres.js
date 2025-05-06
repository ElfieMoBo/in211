import typeorm from 'typeorm';

const Genre = new typeorm.EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    name: {
      type: String,
      unique: true,
    },
  },
});

export default Genre;
