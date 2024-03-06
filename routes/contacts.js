const express = require('express').Router();
const router = express();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.put('/:id', contactsController.deleteContact);

module.exports = router;