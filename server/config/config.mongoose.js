const mongoose = require("mongoose");

mongoose.connect(process.env.DB_LINK, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Conexión a la base de datos exitosa"))
	.catch(err => console.log("Algo salió mal", err));