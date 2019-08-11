import express from "express";
import * as path from "path";

const STATIC_DIR = "../../client/dist";
const PORT = 3000;

const app = express();

app.use(express.static(STATIC_DIR));

app.get("*", function(_, res) {
    res.sendFile(path.resolve(__dirname + "/../../client/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Express web server started: http://localhost:${PORT}`);
    console.log(`Serving content from /${STATIC_DIR}/`);
});
