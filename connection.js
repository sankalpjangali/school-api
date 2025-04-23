const mysql1=require("mysql2")
require('dotenv').config();
const fs=require("fs")
const mysql=mysql1.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port: DB_PORT, 
  ssl: {
    ca: fs.readFileSync('./ca.pem'),
    rejectUnauthorized: true
  },
  connectTimeout: 100000
})
module.exports=mysql
