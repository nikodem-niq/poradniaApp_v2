const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
    
  } catch (err) {
      res.status(401);
  }
};

// module.exports = verifyToken;