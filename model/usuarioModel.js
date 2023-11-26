const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const usuarioModel = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull:false
    },

    senha: {type: DataTypes.STRING,
    allowNull: false
    }
});

usuarioModel.sync();
module.exports = { usuarioModel };//config/database.js

