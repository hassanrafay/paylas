const express = require('express');
const CreditCardController = require('../controllers/credit_card');
const authorizer = require('../middlewares/authorizer');

const router = express.Router();

router.get('/', authorizer, CreditCardController.getAll);
router.post('/', authorizer, CreditCardController.create);
router.get('/:id', authorizer, CreditCardController.get);
router.put('/:id', authorizer, CreditCardController.update);
router.delete('/:id', authorizer, CreditCardController.delete);
router.post('/charge', CreditCardController.charge);

module.exports = router;
