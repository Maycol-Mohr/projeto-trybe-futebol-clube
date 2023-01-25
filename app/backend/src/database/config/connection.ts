const Sequelize = require('sequelize');
const config = require('./database');
// const db = { sequelize: null, Sequelize: null };
console.log('config', config.host);


export const sequelize = new Sequelize(config);

