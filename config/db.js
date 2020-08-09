const moongose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await moongose.connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log("Hubo un error");
    process.exit(1);
  }
};

module.exports = conectarDB;
