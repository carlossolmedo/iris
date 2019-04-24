const express = require('express');
const router = express.Router();
const db = require('mysql');
const config = require('./config');
let connection = db.createConnection(config);
const passHash = require('password-hash');


connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home page' });
});

/* Maps page. */
router.get('/map', (req, res) => {
  res.render('maps', { title: 'Carte maps' });
});

/*  Login */
router.post('/login', (req, res) => {

  res.render('maps', { title: 'Welcome' });
});

/*  Register */
router.post('/register', (req, res) => {

  let data = {
    name: req.body.name,
    password: passHash.generate(req.body.password),
    email: req.body.email
  };

  console.log('data: ', data);

  let sql = `
    INSERT INTO users(name, password, email, travel_time) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;

  let values = [data.name, data.password, data.email];
  //connection.query(sql);

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.send('Data saved');
  });

  connection.end();
  console.log('Done !');

});

module.exports = router;
