const express = require('express');
const ChildController = require('../controllers/child');
const authorizer = require('../middlewares/authorizer');

const router = express.Router();

router.get('/', authorizer, ChildController.getAll);
router.post('/', authorizer, ChildController.create);
router.get('/:id', authorizer, ChildController.get);
router.put('/:id', authorizer, ChildController.update);
router.delete('/:id', authorizer, ChildController.delete);

module.exports = router;
