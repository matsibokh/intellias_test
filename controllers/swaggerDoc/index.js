const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();

const swaggerDefinition = {
    info: {
        title: "Documentation (Node Swagger API)",// Identity Management Service
        description: "(RESTful API with Swagger)",//API to allow JWT authentication and authorization
        version: "1.0.0"
    },
    host: "localhost:3000",
    basePath: "/",
    "schemes": [
        "http",
        "https"
    ],

    // Appears in authentifivcate modal popup
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "token",
            in: "header"
        }
    }
};

// Options for the swagger docs
const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        "./controllers/*.js"
    ] // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.use("/api-docs/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(swaggerSpec, null, 2));
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;