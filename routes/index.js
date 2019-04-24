const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home page' });
});

/* Maps page. */
router.get('/map', (req, res, next) => {
  res.render('maps', { title: 'Carte maps' });
});

/*  Login */
router.post('/login', (req, res, next) => {
  res.render('maps', { title: 'Carte maps' });

});


module.exports = router;
