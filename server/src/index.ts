import server from "./server";
import * as env from "./env";

server.listen(env.PORT, () => {
    console.log(`Express web server started: http://localhost:${env.PORT}`);
});
