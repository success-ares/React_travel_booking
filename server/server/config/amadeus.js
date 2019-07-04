const Amadeus = require('amadeus')
const { amadeusClientId, amadeusClientSecret } = require('./vars')

const amadeusClient = new Amadeus({
  clientId: amadeusClientId,
  clientSecret: amadeusClientSecret
})

module.exports = amadeusClient
