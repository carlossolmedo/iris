const express = require('express');
const router = express.Router();

/* Maps page. */
router.get('/paris', (req, res) => {
    res.render('cities/paris', { title: 'Paris' });
});

module.exports = router;
