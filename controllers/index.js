const express = require("express");
const router = express.Router();
const rootPath = "../";
// Add swagger documentation route
router.use("/swagger", require("./swaggerDoc"));

router.use("*", require(rootPath + "middlewares/authorization"));
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