const rootPath = "../";
const config = require(rootPath + "config.js");
const sqlite3 = require('sqlite3').verbose();

const connectToDB = function(){
    let db = new sqlite3.Database(config.db.database, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the events database.');
    });
    return db;
};

const insertData = function(data, table){
    //data should contain information like column_name:value
    const db = connectToDB();
    let sql = `INSERT INTO ${table}(${Object.keys(data).join(", ")}) VALUES(`;
    const dataValues = [];
    for(let value in data){
        sql += "?, ";
        dataValues.push(data[value]);
    }
    sql = sql.substr(0, sql.length - 2) + ")";
    return new Promise((resolve, reject)=> {
        db.run(sql, dataValues, function (err) {
            if (err) {
                reject(err);
            }
            db.close();
            // return the last insert id
            resolve(this.lastID);
        });
    })
};

const selectAll = function(table){
    const db = connectToDB();
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM ${table}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            db.close();
            resolve(rows);
        });
    })
};

const selectByParam = function(data, table){
    const db = connectToDB();
    return new Promise((resolve, reject)=>{
        const param = Object.keys(data)[0];
        const value = data[param];
        const sql = `SELECT COUNT (*) as 'viewsCount' FROM ${table} WHERE ${param}='${value}' GROUP BY ${param}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            db.close();
            resolve(rows[0]);
        });
    })
};

const usersReturning = function(table){
    const db = connectToDB();
    return new Promise((resolve, reject)=>{
        const sql = `SELECT count (*) as usersCount FROM (SELECT COUNT(user_id) as 'uniqueUsers' FROM ${table} GROUP BY user_id) t1`;
        const sql1 = `SELECT count (*) as returnedUsersCount FROM (SELECT COUNT(user_id) as 'returnedUsers' FROM ${table} GROUP BY user_id HAVING COUNT(user_id)>1) t1`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            db.all(sql1, [], (err, rows1) => {
                if (err) {
                    reject(err);
                }
                const usersReturningRate = Math.round(Number(rows1[0].returnedUsersCount)/Number(rows[0].usersCount) * 100) + "%";
                db.close();
                resolve({usersReturningRate});
            });
        });
    })
};


module.exports = {
    insertData: insertData,
    selectAll: selectAll,
    selectByParam: selectByParam,
    usersReturning: usersReturning
};