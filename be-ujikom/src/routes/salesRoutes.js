const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', salesController.create);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.delete);

module.exports = router;