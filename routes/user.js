const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/all', auth, userCtrl.getAllUser);

module.exports = router; 