const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, we appear to have lost that page.'})
  })
  
  
  /* ***********************
  * Express Error Handler
  * Place after all other middleware
  *************************/
app.use(async (err, req, res, next) => {
    let nav = await utilities.getNav()
    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
    res.render("errors/error", {
      title: err.status || 'Server Error',
      message,
      nav
    })
  })
  


mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});



