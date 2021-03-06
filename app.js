const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const countryRoutes = require('./routes/country');
const userRoutes = require('./routes/user');

// require('dotenv').config({ path: '.env.local' });
require('dotenv').config();


const app = express();
mongoose.connect(process.env.DB_URL,
 {
   useNewUrlParser : true,
   useUnifiedTopology : true
 })
 .then(() => console.log('Connexion à MongoDB réussie'))
 .catch(() => console.log('Connexion à MongoDB échouée'));
/**
 * Middleware
 * Gestion des header 
 * Format de 
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);

app.use('/api/country', countryRoutes);
app.use('/api/auth', userRoutes);

module.exports = app; 