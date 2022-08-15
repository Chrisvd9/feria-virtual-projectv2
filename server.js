const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./server/config/db');
const path = require('path');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./server/middleware/error.middleware');
const productRoutes = require('./server/routes/product.routes');
const userRoutes = require('./server/routes/user.routes');
const orderRoutes = require('./server/routes/order.routes');
const uploadRoutes = require('./server/routes/upload.routes');


connectDB()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Api corriendo')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID )
)

const _dirname = path.resolve()
// app.use('/uploads', express.static(path.join(_dirname, '/uploads')))


app.use(notFound)


app.use(errorHandler)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Servidor ${PORT} conectado`)})