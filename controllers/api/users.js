const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

/**
 * Controller functions for user authentication and authorization.
 * @module UserController
 */

module.exports = {
  createUser,
  login,
  checkToken
};

/**
 * Checks the validity of the user's token and responds with the token's expiration timestamp.
 * @function
 * @param {Object} req - Express request object containing user information from the token.
 * @param {Object} res - Express response object.
 */
function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

/**
 * Creates a new user and responds with a JWT token.
 * @function
 * @param {Object} req - Express request object containing user registration information.
 * @param {Object} res - Express response object.
 */
async function createUser(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/**
 * Authenticates the user and responds with a JWT token upon successful login.
 * @function
 * @param {Object} req - Express request object containing user login credentials.
 * @param {Object} res - Express response object.
 */
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions ---*/

/**
 * Creates a JSON Web Token (JWT) for user authentication.
 * @function
 * @param {Object} user - User object to include in the token payload.
 * @returns {string} JWT token.
 */
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
