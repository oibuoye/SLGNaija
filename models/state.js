const Joi = require('joi');
const mongoose = require('mongoose');


const stateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  });
  

const State = mongoose.model('State', stateSchema);

function validateState(State) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  };

  return Joi.validate(State, schema);
}

exports.State = State; 
exports.validate = validateState;
