import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    pseudo: req.body.pseudo,
    shadow: req.body.shadow,
    age: req.body.age,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.get('/login/:userid/:usershadow', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({
      where: {
        id: req.params.userid
      }
    })
    .then(function (user) {
      user[0].shadow == req.params.usershadow ? (
        res.status(201).json(user)
      ) : res.status(400).json({
        message: `Bad password for ${user[0].pseudo}`,
      })
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while authentification' });
    });
})

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
