const mysql = require('mysql');
const dbconfig = require('../configs/dbconfig.js');

var mysqlconnection = mysql.createPool({
    host : dbconfig.HOST,
    user : dbconfig.USER,
    password : dbconfig.PASSWORD,
    database : dbconfig.DATABASE
});

module.exports = mysqlconnection;