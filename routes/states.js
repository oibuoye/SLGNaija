const { State, validate } = require('../models/state');
const express = require('express');
const winston = require('winston');
const router = express.Router();

router.get('/', async (req, res) => {
  const getstates = await State.find();
  res.send(getstates);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isStateExist = await State.findOne({ name: req.body.name });
  if (isStateExist != null) {
    return res.status(400).send("State already exist");
  }

  let state = new State({ name: req.body.name });
  state = await state.save();

  res.send(state);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const state = await State.findByIdAndUpdate(req.params.id, { name: req.body.Name }, {
    new: true
  });

  if (!state) return res.status(404).send('The state with the given ID was not found.');

  res.send(state);
});

router.delete('/:id', async (req, res) => {
  const state = await State.findByIdAndRemove(req.params.id);

  if (!state) return res.status(404).send('The state with the given ID was not found. Id: ', req.params.id);

  res.send(state);
});

router.get('/:id', async (req, res) => {
  const state = await State.findById(req.params.id);

  if (!state) return res.status(404).send('The state with the given ID was not found. ');

  res.send(state);
});

router.post('/bundle', async (req, res) => {
  const request = req.body;
  if(request.length === 0){
    return res.status(400).send("Bad request");
  }


  for (let i = 0; i < request.length; i++) {
    const { error } = validate(request[i]);
    if (error) return res.status(400).send(error.details[0].message);

    const isStateExist = await State.findOne({ name: request[i].name });
    if (isStateExist != null) {
      return res.status(400).send("State already exist. State Name => " + request[i].name);
    }

    let state = new State({ name: request[i].name });
    state = await state.save();
  }
  res.send("Successful");

});


module.exports = router;