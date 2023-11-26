const { DataTypes } = require('sequelize');
const { database } = require('./config/database');

const produtoModel = database.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    produto: {
        type: DataTypes,STRING, 
        allowNull: false
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

});

produtoModel.sync();
module.exports = { produtoModel };