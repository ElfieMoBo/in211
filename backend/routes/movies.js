import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';


const router = express.Router();

router.get("/", function (req, res) {
    res.send([]);
    console.log("testing: don't know how to log res...");
});

router.post('/new', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    // Creating a new movie based on the request
    const newMovie = movieRepository.create({
        title: req.body.title,
        date: req.body.date,
        overview: req.body.overview,
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

export default router;





















