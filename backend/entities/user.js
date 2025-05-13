import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    pseudo: {
      type: String,
      unique: true,
    },
    age: {
      type: Number
    },
    shadow: {
      type: String
    }
  },
});

export default User;
