const {LGA, validate} = require('../models/lga');
const express = require('express');
const { State } = require('../models/state');

const router = express.Router();

router.get('/', async (req, res) => {
  const lgas = await LGA.find();
  res.send(lgas);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const isStateExist = await State.findOne({stateName: req.body.stateName});
  if(isStateExist == null){
    return res.status(400).send("State doesn't exist");
  }

  let lga = new LGA({ LGAName: req.body.LGAName, stateName: req.body.stateName });
  lga = await lga.save();
  
  res.send(lga);
} );

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const lga = await LGA.findByIdAndUpdate(req.params.id, { name: req.body.LGAName }, {
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
  const lga = await LGA.findById(req.params.id);

  if (!lga) return res.status(404).send('The LGA with the given ID was not found. ');

  res.send(lga);
});

module.exports = router;