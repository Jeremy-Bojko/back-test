'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log('Hello');
    res.render('pages/index');
});
router.get('/about', function(req, res) {
    res.render('pages/about');
});

module.exports = router; 