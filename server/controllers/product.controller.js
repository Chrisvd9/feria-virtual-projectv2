const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({ message: 'Producto borrado' })
    } else {
        res.status(400)
        throw new Error('Producto no encontrado')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock, } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {  
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Producto no encontrado')
    }   
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {  
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Producto ya puntuado')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)
        / product.reviews.length

        await product.save()
        res.status(201).json( {message: 'Reseña agregada' })

    } else {
        res.status(404)
        throw new Error('Producto no encontrado')
    }   
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})


module.exports = { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts }