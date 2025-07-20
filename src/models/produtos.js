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
    estado: {
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

Produtos.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Produtos, { foreignKey: "userId" });

module.exports = Produtos;