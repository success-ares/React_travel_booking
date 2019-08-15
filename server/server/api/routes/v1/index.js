const express = require('express')
const flightRoutes = require('./flight.route')
const hotelRoutes = require('./hotel.route')
const userController = require('../../controllers/user.controller');
const bookController = require('../../controllers/book.controller');
const router = express.Router()
var user = new userController();
var booking = new bookController();
var jwt = require('jsonwebtoken');
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'))
router.use('/flight', isLoggedIn, flightRoutes)
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/flight/locations');
router.use('/hotel', isLoggedIn,hotelRoutes);
router.post('/booking', booking.book);
router.post('/hotelbooking',booking.hotel);
function isLoggedIn(req, res, next) {
    let headerToken = req.headers.token;
    let jwtSecretKey = process.env.JWT_SECRET;
    let jwtAlgorithm = { algorithms: process.env.JWT_ALGORITHM };
    jwt.verify(headerToken, jwtSecretKey, jwtAlgorithm, (err, decoded) => {
        if (err) {
            res.status(401).json({ status: false, message: 'Unauthorized' });
        } else {
            req.headers.user_id = decoded.id;
            req.headers.email = decoded.email;
            next();
        }
    });
}

module.exports = router
