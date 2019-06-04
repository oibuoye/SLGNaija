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

  const isStateExist = await State.findOne({stateName: req.body.stateName});
  if(isStateExist != null){
    return res.status(400).send("State already exist");
  }

  let state = new State({ stateName: req.body.stateName });
  state = await state.save();

  res.send(state);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const state = await State.findByIdAndUpdate(req.params.id, { name: req.body.stateName }, {
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

module.exports = router;