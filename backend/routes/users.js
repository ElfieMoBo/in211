import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { createHash } from 'node:crypto'


const router = express.Router();

async function strHash(a, b) {
  b = b || 'SHA-1';
  var c = new TextEncoder().encode(a),
    d = await crypto.subtle.digest(b, c),
    e = Array.from(new Uint8Array(d)),
    f = e.map(function (c) {
      return c.toString(16).padStart(2, '0');
    }).join('');
  return f;
}

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const hash = createHash('sha256').update(req.body.passwd).digest('hex');
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    pseudo: req.body.pseudo,
    shadow: hash,
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

router.get('/user-by-pseudo/:pseudo', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({
      where: { pseudo: req.params.pseudo }
    })
    .then(function (user) {
      res.json({ user: user });
    });
});

router.post('/login', function (req, res) {
  console.log(req.body)
  const hash = createHash('sha256').update(req.body.passwd).digest('hex');
  appDataSource
    .getRepository(User)
    .find({
      where: {
        pseudo: req.body.pseudo
      }
    })
    .then(function (user) {
      console.log("user", user)
      user[0].shadow == hash ? (
        res.status(201).json(user)
      ) : res.status(400).json({
        message: `Mot de passe incorrect pour (${user[0].pseudo})`,
      })
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: "Ce nom d'utilisateur est inconnu" });
    });
});

router.delete('/delete/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: "L'utilisateur a été supprimé avec succès" });
    })
    .catch(function () {
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur" });
    });
});

export default router;
