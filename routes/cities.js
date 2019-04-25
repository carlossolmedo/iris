const express = require('express');
const router = express.Router();

/* Paris */
router.get('/paris', (req, res) => {
    res.render('cities/paris', { title: 'Paris' });
});

/* Lyon */
router.get('/lyon', (req, res) => {
    res.render('cities/lyon', { title: 'Lyon' });
});

/* Marseille */
router.get('/marseille', (req, res) => {
    res.render('cities/marseille', { title: 'Marseille' });
});

module.exports = router;
