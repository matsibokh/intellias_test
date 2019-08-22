const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.urlencoded({ extended: true });
const rootPath = "../";
const router = express.Router();
const Events = require (rootPath + "services/Events");
const wrapPromiseResponse = require(rootPath + "helpers/utils").wrapPromiseResponse;
const useragent = require('express-useragent');
const expressip = require('express-ip'); //Note: This won’t work if you are localhost

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
 *    security:
 *       - jwt: []
 */
router.post("/newEvent", jsonParser, expressip().getIpInfoMiddleware, wrapPromiseResponse(function (req) {
            const user_id = req.query.user_id;
            const page_id = req.query.page_id;
            const timestamp = req.query.timestamp;
            const user_agent = req.headers['user-agent'];
            const browser = useragent.parse(user_agent).browser;

            //ipInfo.city and ipInfo.country can be stored into db
            // next function only for testing
            function getRandomCountry(){
                const countries = ["Ukraine", "USA", "Poland", "Germany", "Brazil"];
                const countryCode = Math.floor(Math.random() * (6));
                return countries[countryCode];
            }
            const ipInfo = req.ipInfo;  //Note: This won’t work if you are localhost
            const country = ipInfo.country || getRandomCountry();

            return Events.newEvent(user_id, page_id, timestamp, browser, country);
    })
);

/**
 * @swagger
 /events/getAllEvents:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: get all event
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    responses:
 *       200:
 *         description: string
 *    security:
 *       - jwt: []
 */
router.get("/getAllEvents", wrapPromiseResponse(function (req) {
        return Events.getAllEvents();
    })
);

/**
 * @swagger
 /events/getViewsByPageID:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: get views by page id
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    parameters:
 *      - name: pageID
 *        in: query
 *        description: Unique page id
 *        required: false
 *        schema: {}
 *    responses:
 *       200:
 *         description: string
 *    security:
 *       - jwt: []
 */
router.get("/getViewsByPageID", wrapPromiseResponse(function (req) {
        const page_id = req.query.pageID;
        return Events.getViewsByParam({page_id});
    })
);

/**
 * @swagger
 /events/getViewsByBrowserName:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: get views by page id
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    parameters:
 *      - name: browserName
 *        in: query
 *        description: browserName
 *        required: false
 *        schema: {}
 *    responses:
 *       200:
 *         description: string
 *    security:
 *       - jwt: []
 */
router.get("/getViewsByBrowserName", wrapPromiseResponse(function (req) {
        const browserName = req.query.browserName;
        return Events.getViewsByParam({browser: browserName});
    })
);

/**
 * @swagger
 /events/getViewsByCountry:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: get views by page id
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    parameters:
 *      - name: country
 *        in: query
 *        description: country
 *        required: false
 *        schema: {}
 *    responses:
 *       200:
 *         description: string
 *    security:
 *       - jwt: []
 */
router.get("/getViewsByCountry", wrapPromiseResponse(function (req) {
        const country = req.query.country;
        return Events.getViewsByParam({country});
    })
);

/**
 * @swagger
 /events/returningUsers:
 *   x-swagger-router-controller: User
 *   get:
 *    summary: get views by page id
 *    description: return string
 *    consumes:
 *       - application/jsons
 *    tags:
 *       - Events
 *    responses:
 *       200:
 *         description: string
 *    security:
 *       - jwt: []
 */
router.get("/returningUsers", wrapPromiseResponse(function () {
        return Events.getUsersReturning();
    })
);
module.exports = router;