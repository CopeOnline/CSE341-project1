const router = require('express').Router();
const utilities = require("../utilities/");

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/contacts', utilities.handleErrors(require('./contacts')));

module.exports = router;