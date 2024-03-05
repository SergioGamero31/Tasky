const jwtUtils = require("../utils/jwtUtils");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado." });
  }

  jwtUtils.verifyAccessToken(token, (err, userId) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido." });
    }
    req.userId = userId;
    next();
  });
}

module.exports = {
  authenticateToken,
};
