const httpStatus = require('http-status')
// const models = require('../models')
const { handler: errorHandler } = require('../middlewares/error')
const APIError = require('../utils/APIError')
const amadeusClient = require('../../config/amadeus')

exports.flightOffers = async (req, res) => {
  try {
    const { origin, destination, departureDate } = req.body
    const flightOffers = await amadeusClient.shopping.flightOffers.get({ origin, destination, departureDate })
      .then(res => res.data)
      .catch(error => {
        console.error(error)
        throw new APIError({ message: error.message, status: httpStatus.BAD_REQUEST })
      })
    return res.json(flightOffers)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

exports.locations = async (req, res) => {
  try {
    const { keyword } = req.body
    const locations = await amadeusClient.referenceData.locations.get({
      keyword,
      subType: 'AIRPORT'
    })
      .then(res => res.data)
      .catch(error => {
        console.error(error)
        throw new APIError({ message: error.message, status: httpStatus.BAD_REQUEST })
      })
    return res.json(locations)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}
