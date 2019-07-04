const path = require('path')

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  amadeusClientId: process.env.AMADEUS_CLIENT_ID,
  amadeusClientSecret: process.env.AMADEUS_CLIENT_SECRET
}
