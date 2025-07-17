const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Users = require('./users');

const Produtos = sequelize.define('Produtos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    banner: {
        type: DataTypes.TEXT,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Produtos;