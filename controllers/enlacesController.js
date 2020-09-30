const Enlaces = require("../models/Enlace");
const shortid = require("shortid");

exports.nuevoEnlace = async (req, res, next) => {
  // Crear un objeto de enlace
  const { nombre_original, password } = req.body;
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;
  enlace.password = password;

  // Almacena en BD
  try {
    await enlace.save();
    res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};
