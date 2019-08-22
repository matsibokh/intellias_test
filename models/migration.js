const rootPath = "../";
const config = require(rootPath + "config.js");
const sqlite3 = require('sqlite3').verbose();

const createDB = function() {
    let db = new sqlite3.Database(config.db.database, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the events database.');
    });
    return new Promise(resolve =>{
        db.run('DROP TABLE events', function(){
            console.log('Database was drop.');
            db.run('CREATE TABLE events(' +
                'id INTEGER PRIMARY KEY, ' +
                'page_id INTEGER DEFAULT NULL, ' +
                'user_id INTEGER DEFAULT NULL, ' +
                'timestamp TEXT DEFAULT CURRENT_TIME, ' +
                'browser TEXT DEFAULT NULL, ' +
                'country TEXT DEFAULT NULL);',
                function (err) {
                    if (!err) {
                        db.close();
                        console.log('Database was created.');
                        resolve(true);
                    }
                }
            )
        });
    })
};

const addTestData = function() {
    let db = new sqlite3.Database(config.db.database, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the events database.');
    });

    const data = [
        {
            page_id: "pageID_1",
            user_id: "123",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "Ukraine",
        },
        {
            page_id: "pageID_1",
            user_id: "133",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Mozilla",
            country: "Poland",
        },
        {
            page_id: "pageID_15",
            user_id: "223",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Safari",
            country: "Germany",
        },
        {
            page_id: "pageID_21",
            user_id: "123",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Safari",
            country: "USA",
        },
        {
            page_id: "pageID_21",
            user_id: "586",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "Ukraine",
        },
        {
            page_id: "pageID_45",
            user_id: "123",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "Poland",
        },
        {
            page_id: "pageID_1",
            user_id: "674",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "USA",
        },
        {
            page_id: "pageID_141",
            user_id: "123",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Safari",
            country: "Ukraine",
        },
        {
            page_id: "pageID_141",
            user_id: "674",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "Brazil",
        },
        {
            page_id: "pageID_81",
            user_id: "229",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Mozilla",
            country: "Brazil",
        },
        {
            page_id: "pageID_18",
            user_id: "897",
            timestamp: "2019-08-22T10:50:13.104Z",
            browser: "Chrome",
            country: "Germany",
        }
    ];
    for (let obj of data){
        let sql = `INSERT INTO events(${Object.keys(obj).join(", ")}) VALUES(`;
        const dataValues = [];
        for(let value in obj){
            sql += "?, ";
            dataValues.push(obj[value]);
        }
        sql = sql.substr(0, sql.length - 2) + ")";
        db.run(sql, dataValues);
    }
    console.log('Data was added.');
    db.close();
};

(function(){
     createDB().then(()=>{
         addTestData();
     });
})();