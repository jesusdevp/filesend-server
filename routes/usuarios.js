const express = require("express");
const router = express.Router();
const { nuevoUsuario } = require("../controllers/usuarioController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El Nombre es Obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser al menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  nuevoUsuario
);

module.exports = router;
