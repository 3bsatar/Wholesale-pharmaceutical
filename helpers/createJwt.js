const jwt = require("jsonwebtoken");

/**
 *
 
@param {String} userId // User ID
@param {String} role // User Role
@param {String} expiresIn // Token Expiry like 30d, 7d, 1, 15m, 10h
@returns {String} // JWT Token
*/
module.exports = (userId, role = "customer", expiresIn = "15m") => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};