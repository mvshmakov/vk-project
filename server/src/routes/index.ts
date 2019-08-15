import path from "path";
import { Router, Response, Request } from "express";
import authMiddleware from "@/middlewares/auth";

const commonRoutes = Router();

commonRoutes.get("/", authMiddleware, (req: Request, res: Response) => {
    res.sendFile(
        path.resolve("../client/dist/index.html")
    );
});

export default commonRoutes;
