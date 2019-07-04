const express = require('express')
const validate = require('express-validation')
const controller = require('../../controllers/flight.controller')
const {
  flightOffers, locations
} = require('../../validations/flight.validation')

const router = express.Router()

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('userId', controller.load)

router
  .route('/flight-offers')
  .post([validate(flightOffers), controller.flightOffers])

router
  .route('/locations')
  .post([validate(locations), controller.locations])

// router
//   .route('/profile')
//   /**
//    * @api {get} v1/users/profile User Profile
//    * @apiDescription Get logged in user profile information
//    * @apiVersion 1.0.0
//    * @apiName UserProfile
//    * @apiGroup User
//    * @apiPermission user
//    *
//    * @apiHeader {String} Athorization  User's access token
//    *
//    * @apiSuccess {String}  id         User's id
//    * @apiSuccess {String}  name       User's name
//    * @apiSuccess {String}  email      User's email
//    * @apiSuccess {String}  role       User's role
//    * @apiSuccess {Date}    createdAt  Timestamp
//    *
//    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
//    */
//   .get(authorize(), controller.loggedIn)

// router
//   .route('/:userId')
//   /**
//    * @api {get} v1/users/:id Get User
//    * @apiDescription Get user information
//    * @apiVersion 1.0.0
//    * @apiName GetUser
//    * @apiGroup User
//    * @apiPermission user
//    *
//    * @apiHeader {String} Athorization  User's access token
//    *
//    * @apiSuccess {String}  id         User's id
//    * @apiSuccess {String}  name       User's name
//    * @apiSuccess {String}  email      User's email
//    * @apiSuccess {String}  role       User's role
//    * @apiSuccess {Date}    createdAt  Timestamp
//    *
//    * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
//    * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
//    * @apiError (Not Found 404)    NotFound     User does not exist
//    */
//   .get(authorize(USER), controller.get)
//   /**
//    * @api {put} v1/users/:id Replace User
//    * @apiDescription Replace the whole user document with a new one
//    * @apiVersion 1.0.0
//    * @apiName ReplaceUser
//    * @apiGroup User
//    * @apiPermission user
//    *
//    * @apiHeader {String} Athorization  User's access token
//    *
//    * @apiParam  {String}             email     User's email
//    * @apiParam  {String{6..128}}     password  User's password
//    * @apiParam  {String{..128}}      [name]    User's name
//    * @apiParam  {String=user,admin}  [role]    User's role
//    * (You must be an admin to change the user's role)
//    *
//    * @apiSuccess {String}  id         User's id
//    * @apiSuccess {String}  name       User's name
//    * @apiSuccess {String}  email      User's email
//    * @apiSuccess {String}  role       User's role
//    * @apiSuccess {Date}    createdAt  Timestamp
//    *
//    * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
//    * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
//    * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
//    * @apiError (Not Found 404)    NotFound     User does not exist
//    */
//   .put(authorize(USER), validate(replaceUser), controller.replace)
//   /**
//    * @api {patch} v1/users/:id Update User
//    * @apiDescription Update some user fields
//    * @apiVersion 1.0.0
//    * @apiName UpdateUser
//    * @apiGroup User
//    * @apiPermission user
//    *
//    * @apiHeader {String} Athorization  User's access token
//    *
//    * @apiParam  {String{6..128}}     oldPassword  User's old password
//    * @apiParam  {String{6..128}}     password  User's new password
//    *
//    * @apiSuccess {String}  id         User's id
//    * @apiSuccess {String}  nickname   User's nickname
//    * @apiSuccess {String}  email      User's email
//    * @apiSuccess {String} phoneNumber    User's phoneNumber
//    * @apiSuccess {Date}    createdAt  Timestamp
//    *
//    * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
//    * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
//    * @apiError (Forbidden 403)    Forbidden    Only user with same id can modify the data
//    * @apiError (Not Found 404)    NotFound     User does not exist
//    */
//   .patch(authorize(USER), validate(updateUser), controller.update)
//   /**
//    * @api {patch} v1/users/:id Delete User
//    * @apiDescription Delete a user
//    * @apiVersion 1.0.0
//    * @apiName DeleteUser
//    * @apiGroup User
//    * @apiPermission user
//    *
//    * @apiHeader {String} Athorization  User's access token
//    *
//    * @apiSuccess (No Content 204)  Successfully deleted
//    *
//    * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
//    * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
//    * @apiError (Not Found 404)    NotFound      User does not exist
//    */
  // .delete(authorize(USER), controller.remove)

module.exports = router
