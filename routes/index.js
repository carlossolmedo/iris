const express = require('express');
const router = express.Router();
const db = require('mysql');
const config = require('./config');
let connection = db.createConnection(config);


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
  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;

  console.log(`name: ${name} \n pass: ${password} \n email: ${email}`);

  let sql = `
    INSERT INTO users(name, password, email, travel_time) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;

  let values = [name, password, email];
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
