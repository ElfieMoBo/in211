import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';


const router = express.Router();

router.get("/", function (req, res) {
    appDataSource
        .getRepository(Movie)
        .find({})
        .then(function (movies) {
            res.json({ results : movies })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});

router.get("/get-a-movie/:movieID", function (req, res) {
    appDataSource
        .getRepository(Movie)
        .find({
            where: {
                id: req.params.movieID
            }
        })
        .then(function (movies) {
            res.json({ results: movies })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
});
});


router.post('/new-movie', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    // Creating a new movie based on the request
    const newMovie = movieRepository.create({
        title: req.body.title,
        release_date: req.body.release_date,
        overview: req.body.overview,
        runtime: req.body.runtime,
        limited_age: req.body.limited_age,
    });
    // Inserting this new movie in the BDD
    movieRepository
        .insert(newMovie)
        .then(function (newDocument) {
            res.status(201).json(newDocument);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while creating the movie' });
        })
});

router.delete('/delete-a-movie/:movieID', function (req, res) {
    appDataSource
        .getRepository(Movie)
        .delete({ id: req.params.movieID })
        .then(function () {
            res.status(204).json({ message: 'Movie successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the movie' });
        });
});

export default router;





















