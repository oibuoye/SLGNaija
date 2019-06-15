const { LGA, validate } = require('../models/lga');
const express = require('express');
const { State } = require('../models/state');

const router = express.Router();

router.get('/', async (req, res) => {
  const lgas = await LGA.find().select('-__v');
  res.send(lgas);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the state in the payload exist in the db
  const isStateExist = await State.findOne({ name: req.body.stateName });
  if (isStateExist === null) {
    return res.status(400).send("State doesn't exist");
  }

  //Check if the lga in the payload already exist in the db
  const isLGAExist = await LGA.findOne({ stateName: req.body.stateName, LGAName: req.body.LGAName });
  if (isLGAExist !== null) {
    return res.status(400).send("LGA name already exist");
  }

  let lga = new LGA({ LGAName: req.body.LGAName, stateName: req.body.stateName });
  lga = await lga.save();

  res.send(lga);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const lga = await LGA.findByIdAndUpdate(req.params.id, { LGAName: req.body.LGAName }, {
    new: true
  });

  if (!lga) return res.status(404).send('The LGA with the given ID was not found.');

  res.send(lga);
});

router.delete('/:id', async (req, res) => {
  const lga = await LGA.findByIdAndRemove(req.params.id);

  if (!lga) return res.status(404).send('The LGA with the given ID was not found. Id: ', req.params.id);

  res.send(lga);
});

router.get('/:id', async (req, res) => {
  const lga = await LGA.findById(req.params.id).select('-__v');

  if (!lga) return res.status(404).send('The LGA with the given ID was not found. ');

  res.send(lga);
});

router.post('/getbystatename', async (req, res) => {
  const lga = await LGA.find({ stateName: req.body.stateName }).select('-__v');
  if (lga.length === 0) return res.status(404).send('The LGA with the state name ' + req.body.stateName + ' was not found. ');

  res.send(lga);
});


router.post('/bundle', async (req, res) => {
  const requestPayLoad = req.body;
  if (requestPayLoad.length === 0) {
    return res.status(400).send("Bad request");
  }

  for (let i = 0; i < requestPayLoad.length; i++) {
    const { error } = validate(requestPayLoad[i]);
    if (error) return res.status(400).send(error.details[0].message);

    const isStateExist = await State.findOne({ name: requestPayLoad[i].stateName });
    if (isStateExist === null) {
      return res.status(400).send("State doesn't exist. State Name => " + requestPayLoad[i].stateName);
    }

    //Check if the lga in the payload already exist in the db
    //Skip if exist, and insert if not
    const isLGAExist = await LGA.findOne({ stateName: requestPayLoad[i].stateName, LGAName: requestPayLoad[i].LGAName });
    if (isLGAExist === null) {
      let lga = new LGA({ LGAName: requestPayLoad[i].LGAName, stateName: requestPayLoad[i].stateName });
      lga = await lga.save();
    }

  }

  res.send("Created successfully");
});


module.exports = router;