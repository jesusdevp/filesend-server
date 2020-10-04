const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  limits: { fileSize: 1024 * 1024 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
};

const upload = multer(configuracionMulter).single("archivo");

exports.subirArchivo = async (req, res, next) => {
  upload(req, res, async (error) => {
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.eliminarArchivo = async (req, res) => {};
