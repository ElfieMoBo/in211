import express from 'express';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genres.js';

const router = express.Router();

router.get("/", function (req, res) {
    appDataSource
        .getRepository(Genre)
        .find({})
        .then(function (genre) {
            res.json({ results: genre })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});

router.get("/get-genre-id/:genreName", function (req, res) {
    appDataSource
        .getRepository(Genre)
        .find({
            where:
                {name: req.params.genreName}
        })
        .then(function (genre) {
            res.json({ results: genre })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});

router.get("/get-genres/:genreID1/:genreID2/:genreID3/:genreID4", function (req, res) {
    appDataSource
        .getRepository(Genre)
        .find({
            where: [
                {id: req.params.genreID1},
                {id: req.params.genreID2},
                {id: req.params.genreID3},
                {id: req.params.genreID4}
            ]
        })
        .then(function (genre) {
            res.json({ results: genre })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});

export default router;
