const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// models
const User = require("../models/user.model");

// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  try {
    const { body } = req;
    const { email, password, ...rest } = body;
    // validar que el email no exista
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: `El correo ${email} ya existe` });
    }
    // encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);
    // guardar el usuario en la base de datos
    const newUser = new User({
      ...rest,
      email,
      password: hash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Controlador para autenticar un usuario
const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    // buscar el usuario en la base de datos
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    // comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    // payload del token
    const user = { userId: foundUser._id };
    // generar token
    const token = jwt.sign(user, config.secretKey, {
      expiresIn: config.jwtExpirationTime,
    });
    res.status(200).json({ token, user: foundUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener la información del usuario autenticado
const whoAmI = async (req, res) => {
  try {
    const { userId } = req; // user authenticated
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, userLogin, whoAmI };
