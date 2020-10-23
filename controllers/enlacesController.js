const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  //   Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Crear un objeto de enlace
  const { nombre_original, nombre } = req.body;
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  // Si el usuario esta autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    // Asignar a enlace el numero de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }

    // Asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    // Asignar el autor
    enlace.autor = req.usuario.id;
  }

  // Almacena en BD
  try {
    await enlace.save();
    res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Obtiene un listado de todos los enlaces
exports.todosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlaces.find({}).select("url -_id");
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;
  // Verificar si existe el enlace

  const enlace = await Enlaces.findOne({ url });
  if (!enlace) {
    res.status(404).json({ msg: "Este enlace no existe" });
    return next();
  }

  // Si el enlace existe
  res.json({ archivo: enlace.nombre });

  return;

  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo

  const { descargas, nombre } = enlace;
  if (descargas === 1) {
    // Eliminar archivo
    req.archivo = nombre;

    // Eliminar la entrada en la bd
    await Enlaces.findOneAndRemove(req.params.url);
    next();
  } else {
    enlace.descargas--;
    await enlace.save();
  }
};
