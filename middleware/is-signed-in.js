// middleware/is-signed-in.js
const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  // YOU DO: complete the codes

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: "not authorised" });
  }
};

module.exports = isSignedIn;
