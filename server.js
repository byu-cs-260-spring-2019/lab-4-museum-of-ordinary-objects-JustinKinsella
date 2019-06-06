

const express = require('express');
const bodyParser = require("body-parser");
const functions = require('firebase-functions');
const firebase = require('firebase-admin');

const firebaseApp = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});


app.listen(3000, () => console.log('Server listening on port 3000!'));