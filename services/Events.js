const rootPath = "../";
const db = require(rootPath + "models/Events");

function formatDate() {
    return new Date().toISOString();
}

function newEvent(user_id, page_id, timestamp, browser, country){
    let time = (timestamp) ? timestamp : formatDate();
    const data = {
        user_id,
        page_id,
        timestamp: time,
        browser,
        country
    };
    return db.insertData(data, "events");
}

function getAllEvents(){
    return db.selectAll("events");
}

function getViewsByParam(data){
    return db.selectByParam(data, "events");
}

function getUsersReturning(){
    return db.usersReturning("events");
}

module.exports = {
    newEvent: newEvent,
    getAllEvents: getAllEvents,
    getViewsByParam: getViewsByParam,
    getUsersReturning: getUsersReturning
};