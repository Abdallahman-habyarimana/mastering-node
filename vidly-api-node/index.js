require('express-async-errors')
const winston = require('winston');
const error = require('./middleware/error');
const config = require('config')
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require("express");
const app = express();

winston.addColors(winston.transports.File, { filename: 'logfile.log'})
// set the config 
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rentals", require("./routes/rentals"));
app.use("/api/auth", require("./routes/auth"));

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
