const { Pool } = require("pg");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let databaseInstance;
const credentials = {
    user: "postgres",
    host: "localhost",
    database: "Employee",
    password: "1234",
    port: 5432,
}


const connect = () => {
    return new Promise((resolve,reject)=>{
        new Pool(credentials).connect((err,poolconnection)=>{
            if(err){
                reject(err);
            }
            databaseInstance = poolconnection;
            fs
            .readdirSync(__dirname)
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
            })
            .forEach(file => {
                const query = require(path.join(__dirname,file));
                //databaseInstance.query(query)
            })
            resolve();
        });
    })
}

const authenticate = () => {
    databaseInstance = new Pool(credentials);
}
const getDatabaseInstance = () => {
    if (databaseInstance) return databaseInstance;
    databaseInstance = new Pool(credentials);
    return databaseInstance;
}

module.exports = {
    connect,
    authenticate,
    instance: getDatabaseInstance
}
