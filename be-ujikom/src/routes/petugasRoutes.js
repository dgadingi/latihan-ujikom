const express = require('express');
const router = express.Router();
const petugasController = require('../controllers/petugasController');

router.get('/', petugasController.getAll);
router.get('/:id', petugasController.getById);
router.post('/', petugasController.create);
router.put('/:id', petugasController.update);
router.delete('/:id', petugasController.delete);

module.exports = router;