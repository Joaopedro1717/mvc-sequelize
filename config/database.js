//config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mvc-sequelize','root','positivo',{
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate();

module.exports=sequelize;