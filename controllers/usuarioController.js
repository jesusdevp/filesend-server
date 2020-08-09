const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.nuevoUsuario = async (req, res) => {
  //   console.log(req.body);

  // Verificar si el usuario ya estuvo registrado
  const { email, password } = req.body;

  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res.status(400).json({ msg: "EL usuario ya esta registrado" });
  }

  // Crear un nuevo usuario
  usuario = new Usuario(req.body);

  // Hashear password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    await usuario.save();
    res.json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};
