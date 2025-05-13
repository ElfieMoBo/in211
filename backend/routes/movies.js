import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import { DataSource } from 'typeorm';


const router = express.Router();

router.get("/", function (req, res) {
    appDataSource
        .getRepository(Movie)
        .find({})
        .then(function (movies) {
            res.json({ results: movies })
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
        like: req.body.like,
        poster_path: req.body.poster_path,
        genre_id1: req.body.genre_id1,
        genre_id2: req.body.genre_id2,
        genre_id3: req.body.genre_id3,
        genre_id4: req.body.genre_id4,
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

router.post('/new-list-movies', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    // Creating a new movie based on the request
    for (let i = 0; i < 20; i++) {
        const newMovie = movieRepository.create({
            title: req.body.results[i].title,
            release_date: req.body.results[i].release_date,
            overview: req.body.results[i].overview,
            runtime: req.body.results[i].runtime,
            limited_age: req.body.results[i].limited_age,
            like: req.body.results[i].like,
            poster_path: req.body.results[i].poster_path,
            genre_id1: req.body.results[i].genre_id1,
            genre_id2: req.body.results[i].genre_id2,
            genre_id3: req.body.results[i].genre_id3,
            genre_id4: req.body.results[i].genre_id4,
        });
        // Inserting this new movie in the BDD
        movieRepository
            .insert(newMovie)
            .then(function (newDocument) {
                // res.status(201).json(newDocument);
            })
            .catch(function (error) {
                console.error(error);
                res.status(500).json({ message: 'Error while creating the movie' });
            })
    }
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


router.post('/add-a-comment', function (req, res) {
    console.log(req.body)
    appDataSource
        .createQueryBuilder()
        .update(Movie)
        .set({ comment: req.body.comment, user_comment: req.body.user_comment })
        .where("id = :id", { id: req.body.id })
        .execute()
        .catch((error) =>
            console.log(error)
        )
})

export default router;





















