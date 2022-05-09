const express = require('express');
const router = express.Router();

const countryCtrl = require('../controllers/countryCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, countryCtrl.create);
router.get('/personnal', auth, countryCtrl.getAllCountriesByUserId);
router.get('/all', countryCtrl.getAllCountries);
router.get('/:id', auth, countryCtrl.getCountryById);
router.put('/:id', auth, countryCtrl.putCountryById);
router.delete('/:id', auth, countryCtrl.deleteCountryById) 

module.exports = router;