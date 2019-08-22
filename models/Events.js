const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./models/events.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the events database.');
});

const insertData = function(data, table){
    // need add to migration
    /*db.run('CREATE TABLE events(' +
        'id INTEGER PRIMARY KEY, ' +
        'page_id INTEGER DEFAULT NULL, ' +
        'user_id INTEGER DEFAULT NULL, ' +
        'timestamp TEXT DEFAULT CURRENT_TIME);');*/

    //data should contain information like column_name:value
    let sql = `INSERT INTO ${table}(${Object.keys(data).join(", ")}) VALUES(`;
    const dataValues = [];
    for(let value in data){
        sql += "?, ";
        dataValues.push(data[value]);
    }
    sql = sql.substr(0, sql.length - 2) + ")";
    return new Promise((resolve,reject)=> {
        db.run(sql, dataValues, function (err) {
            if (err) {
                reject(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            db.close();
            resolve(this.lastID);
        });
    })
};

const selectAll = function(table){
    return new Promise((resolve, reject)=>{
        let sql = `SELECT * FROM ${table}`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
            db.close();
        });
    })
};

module.exports = {
    insertData: insertData,
    selectAll: selectAll
};