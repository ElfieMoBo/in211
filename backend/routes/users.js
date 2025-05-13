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
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    pseudo: req.body.pseudo,
    shadow: req.body.passwd,
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
          message: `L'adresse mail "${newUser.email}" existe déjà`,
        });
      } else {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
      }
    });
});

router.post('/login', function (req, res) {
  console.log(req.body)
  appDataSource
    .getRepository(User)
    .find({
      where: {
        pseudo: req.body.pseudo
      }
    })
    .then(function (user) {
      console.log("user", user)
      user[0].shadow == req.body.passwd ? (
        res.status(201).json(user)
      ) : res.status(400).json({
        message: `Mot de passe incorrect pour (${user[0].pseudo})`,
      })
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: "Ce nom d'utilisateur est inconnu" });
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
