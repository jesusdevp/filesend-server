const express = require("express");
const router = express.Router();
const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../controllers/authController");
const { check } = require("express-validator");

router.post("/", autenticarUsuario);

router.get("/", usuarioAutenticado);

module.exports = router;
