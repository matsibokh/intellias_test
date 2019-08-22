const express = require("express");
const path = require('path');

const router = express.Router();
// Add swagger documentation route
router.use("/swagger", require("./swaggerDoc"));
router.use("/events", require("./events"));
router.get("*", function (req, res) {
    const message = "No service found";
    const statusCode = 404;

    res.status(statusCode);
    res.send({
        status: statusCode,
        message: message,
        type: "request"
    });
});

module.exports = router;