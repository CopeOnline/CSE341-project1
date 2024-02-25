const express = require('express');
const router = express();

const usersController = require('../controllers/contacts');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

module.exports = {
    router
};