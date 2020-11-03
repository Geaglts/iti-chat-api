const { app, server, httpServer } = require("./server");
require("./database");

httpServer.listen(app.get("port"), () => {
    console.log(
        `El servidor esta corriendo en http://localhost:${app.get(
            "port"
        )}${server.graphqlPath}`
    );
});
