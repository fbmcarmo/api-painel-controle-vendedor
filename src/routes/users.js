const express = require('express')
const router = express.Router()
const usersMiddleware = require('../middlewares/users')
const usersController = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')

router.post(
    '/users',
    usersMiddleware.validateCreateUser,
    usersController.createUser
)

router.get(
    '/users',
    authMiddleware.validateToken,
    usersController.getUsers,
)

router.get(
    '/users/:id',
    authMiddleware.validateToken,
    usersMiddleware.validateGetUserById,
    usersController.getUserById
)

router.put(
    '/users/:id',
    authMiddleware.validateToken,
    usersMiddleware.validateUpdateUser,
    usersController.updateUser
)

router.delete(
    '/users/:id',
    authMiddleware.validateToken,
    usersMiddleware.validateDeleteUser,
    usersController.deleteUser
)


module.exports = router;