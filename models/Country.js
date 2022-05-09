const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  name: { type: String, required: true} ,
  area: { type: Number, required: true},
  population: { type: Number, required: true},
  capital: { type: String, required: true},
  userId: { type: String, required: true},
  createdBy: { type: String, required: true}
});

module.exports = mongoose.model('Country', countrySchema);