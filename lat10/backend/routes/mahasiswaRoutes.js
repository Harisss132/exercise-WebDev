const express = require('express');
const mahasiswaController = require('../controllers/mahasiswaController');
const mahasiswaMiddleware = require('../middleware/mahasiswaMiddleware');

const router = express.Router();

router.get('/', mahasiswaController.getAllMahasiswa);
router.get('/:id', mahasiswaController.getMahasiswaById);
router.post('/', mahasiswaMiddleware.validateDataMahasiswa ,mahasiswaController.createMahasiswa);
router.put('/:id', mahasiswaMiddleware.validateDataMahasiswa, mahasiswaController.updateMahasiswa);
router.delete('/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;