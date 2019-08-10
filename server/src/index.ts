const express = require("express");
const path = require("path");

const app = express();
const portNumber = 3000;
const sourceDir = "../../client/dist";

app.use(express.static(sourceDir));

app.get("*", function() {
    console.log("yes");
});

app.listen(portNumber, () => {
    console.log(`Express web server started: http://localhost:${portNumber}`);
    console.log(`Serving content from /${sourceDir}/`);
});
