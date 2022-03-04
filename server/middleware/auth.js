const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

const verifyPermission = (role) => {
  return (req, res, next) => {
    if (req.user.role == "admin" || req.user.role == role) return next();
    return res.sendStatus(403);
  };
};

module.exports = { verifyAuth, verifyPermission };
