const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.urlencoded({ extended: true });
const rootPath = "../";
const router = express.Router();
const Events = require (rootPath + "services/Events");

/**
 * @swagger
 /events/newEvent:
 *   x-swagger-router-controller: User
 *   post:
 *    summary: store new event
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    parameters:
 *       - in: query
 *         name: user_id
 *         description: user id
 *         type: string
 *       - in: query
 *         name: page_id
 *         description: visited page id
 *       - in: query
 *         name: timestamp
 *         description: event time
 *    produces:
 *       - application/json
 *    responses:
 *       200:
 *         description: string
 */
router.post("/newEvent", jsonParser, function (req,res) {
        const user_id = req.query.user_id;
        const page_id = req.query.page_id
        const timestamp = req.query.timestamp;

        Events.newEvent(user_id, page_id, timestamp).then(result => {
                res.send(result);
        });
});

/**
 * @swagger
 /events/getAllEvents:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: store new event
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    responses:
 *       200:
 *         description: string
 */
router.get("/getAllEvents", function (req,res) {
        Events.getAllEvents().then(result => {
                res.send(JSON.stringify(result));
        });
});

module.exports = router;