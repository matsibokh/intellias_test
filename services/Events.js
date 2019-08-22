const rootPath = "../";
const db = require(rootPath + "models/Events");

function newEvent(user_id, page_id, timestamp){
    const data = {
        user_id,
        page_id,
        timestamp
    };
    return db.insertData(data, "events");
}

function getAllEvents(){
    return db.selectAll("events");
}

module.exports = {
    newEvent: newEvent,
    getAllEvents: getAllEvents
};