const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

// Middleware para verificar el token
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ error: "Acceso denegado" });
    const token = authHeader.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, config.secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "El token es invalido" });
  }
}

module.exports = verifyToken;
