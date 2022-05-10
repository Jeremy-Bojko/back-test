const Country = require('../models/Country');
const fs = require('fs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

exports.create = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  User.findOne({_id : userIdReq})
  .then(user => {
    console.log('User ', user);
    const countryObject = req.body; 
    delete countryObject._id;
    console.log("Before : ", countryObject);
    const country = new Country({
      ...countryObject,
      userId: user._id,
      createdBy: user.email,
      // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log("After : ", country);
    country.save()
    .then(() => {
      res.status(201).json({ message : 'Nouveau pays créé' });
    })
    .catch(error => {
      res.status(400).json({ error });
    })
  })
  .catch(error => res.status(404).json({ error }));
  // const thingObject = JSON.parse(req.body.thing); 
  
};

exports.getAllCountriesByUserId = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  Country.find({userId : userIdReq})
  .then(countries => res.status(200).json(countries))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllCountries = (req, res, next) => {
  Country.find()
  .then(countries => res.status(200).json(countries))
  .catch(error => res.status(400).json({ error }));
};

exports.getCountryById = (req, res, next) => {
  console.log(req.params.id);
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  Country.findOne({ _id: req.params.id, userId: userIdReq  })
  .then(country => res.status(200).json(country))
  .catch(error => res.status(404).json({ error }));
};

exports.putCountryById = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  Country.findOne({ _id: req.params.id, userId: userIdReq  })
  .then(country => {
    const countryObject = {...req.body};
    Country.updateOne({ _id : req.params.id}, {...countryObject, _id : req.params.id })
    .then(() => res.status(200).json({ message : 'Country Updated' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(404).json({ error }));

  
};

exports.deleteCountryById = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  console.log(userIdReq);
  Country.findOne( { _id: req.params.id, userId: userIdReq})
  .then(country => {
    if(country) {
      Country.deleteOne( { _id: req.params.id})
      .then(() => res.status(200).json({ message : 'Country Deleted'}))
      .catch(error => res.status(500).json({ error })); 
    } else {
      res.status(401).json({ error : 'Unauthorized'})
    } 
  })
  .catch(error => res.status(404).json({ error }));
}