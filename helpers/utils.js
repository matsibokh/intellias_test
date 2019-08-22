const wrapPromiseResponse = function (responseHandler) {
    return function (req, res) {
        try {
            responseHandler(req, res).then(
                function (result) {
                    res.json(result);
                }
            ).catch(
                function (error) {
                    sendClientError(res, error);
                }
            );
        } catch (responseHandlerError) {
            sendClientError(res, responseHandlerError);
        }
    };
};

const sendClientError = function (res, err) {
    const errorResponse = {
        name: "Error",
        message: err.message || "No error message.",
        code: err.code || "No error code."
    };
    res.status(err.status || 500);
    res.json(errorResponse);

    res.json(errorResponse);
};

module.exports = {
    wrapPromiseResponse: wrapPromiseResponse
}