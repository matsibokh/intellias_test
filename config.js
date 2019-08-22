const config = {
    port: 4201,
    tokenName: "token",
    tokenKey: "6i2nSgWu0DfYIE8I0ZBJOtxTmHJATRzu",

    // DB connection pool config; If use normal db like MySQL or PostgreSQL here could be stored db configuration
    db: {
        database: './models/events.db',
    },
};

module.exports = config;