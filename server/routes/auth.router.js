const express = require("express");
const authRouter = express.Router();

//controllers
const {
  registerUser,
  userLogin,
  whoAmI,
} = require("../controllers/auth.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");

// routes
// api para registrar un usuario
authRouter.post("/register", registerUser);
// api para iniciar sesión
authRouter.post("/login", userLogin);
// api para obtener la información del usuario autenticado
authRouter.get("/whoami", verifyJWT, whoAmI);

module.exports = authRouter;
