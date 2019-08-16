import path from "path";
import { Router, Response, Request } from "express";
import { auth as authMiddleware} from "@/middlewares";

const commonRoutes = Router();

commonRoutes.get("/", authMiddleware, (req: Request, res: Response) => {
    res.sendFile(
        path.resolve("../client/dist/index.html")
    );
});

commonRoutes.get("/ping", (req: Request, res: Response) => {
    res.sendStatus(200);
});

export default commonRoutes;
