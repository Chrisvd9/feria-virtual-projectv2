const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/user.model');


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Email o contraseña inválido')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('El usuario ya existe')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Usuario inválido')
    }
})


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Usuario no encontrado')
    }
})


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        
        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        })

    } else {
        res.status(401)
        throw new Error('Usuario no encontrado')
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({ message: 'Usuario removido' })
    } else {
        res.statusMessage(404)
        throw new Error('Usuario no econtrado')
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user)
    } else {
        res.statusMessage(404)
        throw new Error('Usuario no econtrado')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
        
        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })

    } else {
        res.status(401)
        throw new Error('Usuario no encontrado')
    }
})

module.exports = { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, getUserById, updateUser }