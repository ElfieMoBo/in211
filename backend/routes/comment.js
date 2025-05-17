import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comment.js';

const router = express.Router();

router.get("/", function (req, res) {
    appDataSource
        .getRepository(Comment)
        .find({})
        .then(function (comment) {
            res.json({ results: comment })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});

router.get("/get-comments/:movieID/:userID", function (req, res) {
    appDataSource
        .getRepository(Comment)
        .find({
            where: {
                movie_id: req.params.movieID,
                user_id: req.params.userID
            }
        })
        .then(function (comments) {
            res.json({ results: comments })
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error : no access to the data base' });
        });
});


router.post('/add-comment', function (req, res) {
    const movieRepository = appDataSource.getRepository(Comment);
    // Creating a new movie based on the request
    const newComment = movieRepository.create({
        movie_id: req.body.movie,
        user_id: req.body.user,
        comment: req.body.comment,
    });
    // Inserting this new movie in the BDD
    movieRepository
        .insert(newComment)
        .then(function (newDocument) {
            res.status(201).json(newDocument);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while creating the movie' });
        })
});

router.delete('/delete-a-comment/:commentID', function (req, res) {
    appDataSource
        .getRepository(Comment)
        .delete({ id: req.params.commentID })
        .then(function () {
            res.status(204).json({ message: 'Comment successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the comment' });
        });
});

export default router;





















