const express = require('express')
const validate = require('express-validation')
const controller = require('../../controllers/hotel.controller')
const {
  hotelOffers, locations
} = require('../../validations/hotel.validation')

const router = express.Router()

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('userId', controller.load)

router
  .route('/hotel-offers')
  .post([validate(hotelOffers), controller.flightOffers])

router
  .route('/locations')
  .post([validate(locations), controller.locations])

// router
//   .route('/searches')
//   .get(controller.searches)

module.exports = router
