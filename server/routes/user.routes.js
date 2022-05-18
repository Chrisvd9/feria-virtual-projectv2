const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)



module.exports = router