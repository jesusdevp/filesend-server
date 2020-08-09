const Usuario = require("../models/Usuario");

exports.nuevoUsuario = async (req, res) => {
  //   console.log(req.body);

  // Verificar si el usuario ya estuvo registrado
  const { email } = req.body;

  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res.status(400).json({ msg: "EL usuario ya esta registrado" });
  }

  usuario = await new Usuario(req.body);
  usuario.save();
  res.json({ msg: "Usuario Creado Correctamente" });
};
