const Joi = require('joi')
// const models = require('../models')

module.exports = {
  // POST /v1/flight/flightOffers
  hotelOffers: {
    body: {
      cityCode: Joi.string().min(3).max(3).required(),
    //   departureDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
    //   childs: Joi.number().integer().min(0).max(100),
    //   adults: Joi.number().integer().min(1).max(100).required(),
    //   returnDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required()
    },
  },
  locations: {
    body: {
      keyword: Joi.string().min(1).required()
    }
  }
}
