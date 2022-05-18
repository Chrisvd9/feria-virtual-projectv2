const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        await console.log(`Conexion con Mongo DB Atlas exitosa: ${conn.connection.host}`);
        
    } catch (err) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectMongo