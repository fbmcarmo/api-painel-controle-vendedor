const { Users } = require('../models')

async function createUser(req, res){
    try {
        await Users.create(req.body)
        return res.status(201).send('Usuário criado com sucesso')
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            error: error.message
        })
    }
}

async function getUsers(req, res) {
    try {
        const users = await Users.findAll()
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ 
            error: error.message 
        })
    }
}

async function getUserById(req, res) {
    const { id } = req.params
    try {
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ 
            error: error.message 
        })
    }
}

async function updateUser(req, res) {
    const { id } = req.params
    try {
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }

        await user.update(req.body)
        return res.status(200).send('Usuário atualizado com sucesso')
    } catch (error) {
        console.error(error)
        return res.status(500).send({ 
            error: error.message 
        })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params
    try {
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }

        await user.destroy()
        return res.status(200).send('Usuário deletado com sucesso')
    } catch (error) {
        console.error(error)
        return res.status(500).send({ 
            error: error.message 
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}