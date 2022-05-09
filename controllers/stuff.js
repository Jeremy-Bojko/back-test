const Thing = require('../models/Thing');
const fs = require('fs');
const jwt = require('jsonwebtoken'); 

exports.createThings = (req, res, next) => {
  // const thingObject = JSON.parse(req.body.thing); 
  const thingObject = req.body; 
  delete thingObject._id;
  console.log(thingObject);
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
  .then(() => {
    res.status(201).json({ message : 'Stuff Created' });
  })
  .catch(error => {
    res.status(400).json({ error });
  })
};

exports.getAllThings = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  Thing.find({userId : userIdReq})
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
};

exports.getThingById = (req, res, next) => {
  console.log(req.params.id);
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userIdReq = decodedToken.userId;
  Thing.findOne({ _id : req.params.id,userId : userIdReq  })
  .then(thing => res.status(200).json(thing))
  .catch(error => res.status(404).json({ error }));
};

exports.putThingById = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};

  Thing.updateOne({ _id : req.params.id}, {...thingObject, _id : req.params.id })
  .then(() => res.status(200).json({ message : 'Stuff Updated' }))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteThingById = (req, res, next) => {
  Thing.findOne( { _id: req.params.id})
  .then(thing => {
    // const filename = thing.imageUrl.split('/images/')[1];
    // fs.unlink(`images/${filename}`, ()=> {
      Thing.deleteOne( { _id: req.params.id})
      .then(() => res.status(200).json({ message : 'Stuff Deleted'}))
      .catch(error => res.status(400).json({ error })); 
    // })
  })
  .catch(error => res.status(500).json({ error }));
}