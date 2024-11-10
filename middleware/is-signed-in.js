// middleware/is-signed-in.js
const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  // YOU DO: complete the codes

  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ error: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

module.exports = isSignedIn;
