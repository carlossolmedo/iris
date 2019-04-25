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

/*  Login */
router.post('/login', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  let sql = `SELECT * FROM users WHERE email = ?`;
  let values = [email];

  connection.query(sql, values, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    if(results[0] && passHash.verify(password, results[0].password)) {

      res.render('dashboard', {
        name: results[0].name,
        email: results[0].email,
        travelTime: results[0].travel_time,
        login: true
      });

    } else {
      console.log(results[0]); // true
      res.redirect('/');
    }
  });

});

router.get('/logout', (req, res) => {
  connection.end();
  res.redirect('/');

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

  connection.query(sql, values, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.redirect('/');
  });

  connection.end();

});

/* Paris */
router.get('/paris', (req, res) => {
  res.render('paris', { title: 'Paris' });
});

/* Lyon */
router.get('/lyon', (req, res) => {
  res.render('lyon', { title: 'Lyon' });
});

/* Marseille */
router.get('/marseille', (req, res) => {
  res.render('marseille', { title: 'Marseille' });
});

router.get('/contact', (req, res) => {
  res.render('contact');
});


module.exports = router;
