const express = require('express');
const bookController = require('../controllers/bookControllers');
const bookMiddleware = require('../middleware/bookMiddleware');
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookMiddleware.validateBookData, bookController.createBook);
router.put('/:id', bookMiddleware.validateBookData, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;