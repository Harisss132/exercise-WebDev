const express = require('express');
const movieControllers = require('../controllers/movieController');
const movieMiddleware = require('../middleware/movieMiddleware');

const router = express.Router();

router.get('/', movieControllers.getAllMovies);
router.get('/:id', movieControllers.getMovieById);
router.post('/', movieMiddleware.validateDataMovie, movieControllers.createMovie);
router.put('/:id', movieMiddleware.validateDataMovie, movieControllers.updateMovie);
router.delete('/:id', movieControllers.deleteMovie);

module.exports = router;
