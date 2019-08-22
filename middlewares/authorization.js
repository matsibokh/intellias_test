const rootPath = "../";
const config = require(rootPath + "config.js");
const tokenName = config.tokenName;

const authorization = function (req, res, next) {
    const headers = req.headers;
    if (headers.hasOwnProperty(tokenName)) {
        if(headers[tokenName] == config.tokenKey){
            next();
        } else {
            res.json({
                code: "invalid_authorization",
                message: "Invalid user authorization.",
                debugMessage: "[authorization] middleware: Details: Error in verifying token"
            });
        }

    } else {
        res.json({
            code: "invalid_authorization",
            message: "Invalid user authorization.",
            debugMessage: "[authorization] middleware: Details: No authorization parameters passed."
        });
    }
};

module.exports = authorization;