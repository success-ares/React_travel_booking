const Joi = require('joi')
// const models = require('../models')

module.exports = {
  // POST /v1/flight/flightOffers
  flightOffers: {
    body: {
      origin: Joi.string().min(3).max(3).required(),
      destination: Joi.string().min(3).max(3).required(),
      departureDate: Joi.string().required()
    },
  },
  locations: {
    body: {
      keyword: Joi.string().min(1).required()
    }
  }
}
