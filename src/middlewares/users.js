const { Users } = require('../models')
const bcrypt = require('bcrypt')

async function validateCreateUser(req, res, next){
    const { banner, name, telefone, email, password } = req.body

    if(!banner || !name || !telefone || !email || !password){
        return res.status(400).send({
            error: 'Todos os campos são obrigatórios'
        })
    }

    if(name.length > 255){
        return res.status(400).send({
            error: 'O nome não pode ter mais que 255 caracteres'
        })
    }

    if(email.length > 255){
        return res.status(400).send({
            error: 'O email não pode ter mais que 255 caracteres'
        })
    }

    const existingUser = await Users.findOne({
        where: {
            email: email
        }
    })

    if(existingUser){
        return res.status(400).send({
            error: 'Email já cadastrado'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    req.body.password = hashedPassword

    next();
}

async function validateGetUserById(req, res, next) {
    const { id } = req.params

    if (!id) {
        return res.status(400).send({
            error: 'O ID do usuário é obrigatório'
        })
    }

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send({
            error: 'O ID deve ser um número válido maior que zero'
        })
    }

    const user = await Users.findByPk(id)

    if (!user) {
        return res.status(404).send({
            error: 'Usuário não encontrado'
        })
    }

    req.user = user

    next()
}

async function validateUpdateUser(req, res, next) {
    const { id } = req.params
    const { banner, name, telefone, email, password } = req.body

    if (!id) {
        return res.status(400).send({
            error: 'O ID do usuário é obrigatório'
        })
    }

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send({
            error: 'O ID deve ser um número válido maior que zero'
        })
    }

    const user = await Users.findByPk(id)
    if (!user) {
        return res.status(404).send({
            error: 'Usuário não encontrado'
        })
    }

    if (!banner && !name && !telefone && !email && !password) {
        return res.status(400).send({
            error: 'Pelo menos um dos campos (imagem, name, telefone, email ou password) deve ser informado para atualização'
        })
    }

    if (name && name.length > 255) {
        return res.status(400).send({
            error: 'O nome não pode ter mais que 255 caracteres'
        })
    }

    if (email && email.length > 255) {
        return res.status(400).send({
            error: 'O email não pode ter mais que 255 caracteres'
        })
    }

    if (email && email !== user.email) {
        const existingUser = await Users.findOne({
            where: { email: email }
        })

        if (existingUser) {
            return res.status(400).send({
                error: 'Este email já está cadastrado para outro usuário'
            })
        }
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.password = hashedPassword
    }

    req.user = user

    next()
}

async function validateDeleteUser(req, res, next) {
    const { id } = req.params

    if (!id) {
        return res.status(400).send({
            error: 'O ID do usuário é obrigatório'
        })
    }

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).send({
            error: 'O ID deve ser um número válido maior que zero'
        })
    }

    const user = await Users.findByPk(id)

    if (!user) {
        return res.status(404).send({
            error: 'Usuário não encontrado'
        })
    }

    req.user = user

    next()
}

module.exports = {
    validateCreateUser,
    validateGetUserById,
    validateUpdateUser,
    validateDeleteUser
}