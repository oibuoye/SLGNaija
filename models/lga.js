const Joi = require('joi');
const mongoose = require('mongoose');


const lgaSchema = new mongoose.Schema({
  LGAName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    stateName: {
      type: String,
      required: true
    }
  });
  

const LGA = mongoose.model('LGA', lgaSchema);

function validateLGA(LGA) {
  const schema = {
    LGAName: Joi.string().min(3).max(50).required(),
    stateName: Joi.string().required()
  };

  return Joi.validate(LGA, schema);
}

exports.LGA = LGA; 
exports.validate = validateLGA;
