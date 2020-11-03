const { createServer } = require("http");
const express = require("express");
const server = require("./graphql");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ mensaje: "Bienvenido" });
});

server.applyMiddleware({
    app,
    cors: {
        origin: true,
        credentials: true,
        methods: ["POST"],
        allowedHeaders: [
            "X-Requested-With",
            "X-HTTP-Method-Override",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
    },
});
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use("*", (req, res) => {
    res.json({ codigo: "404" });
});

module.exports = { server, app, httpServer };
