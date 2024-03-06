const express = require('express');
const router = express();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.get('/', contactsController.createContact);

router.get('/:id', contactsController.updateContact);

router.get('/:id', contactsController.deleteContact);

module.exports = router;