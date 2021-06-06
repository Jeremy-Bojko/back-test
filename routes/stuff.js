const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThings);
router.get('/', auth, stuffCtrl.getAllThings)
router.get('/:id', auth, stuffCtrl.getThingById)
router.put('/:id', auth, multer, stuffCtrl.putThingById)
router.delete('/:id', auth, stuffCtrl.deleteThingById) 

module.exports = router;