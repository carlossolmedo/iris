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

  let email = req.body.email;
  var password = req.body.password;

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
        travelTime: results[0].travel_time
      });

      /*req.session.regenerate(function(){
        req.session.login = true;
        req.session.username = user_login;
        req.session.data = results[0];
        res.redirect(req.baseUrl);

      });*/

    } else {
      console.log(results[0]); // true
      res.redirect('/');
    }
  });

  connection.end();

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
