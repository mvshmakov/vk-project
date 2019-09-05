import path from "path";
import { Router } from "express";
import { auth as authMiddleware} from "@/middlewares";

const commonRoutes = Router();

commonRoutes.get("/", authMiddleware, (_req, res) => {
    res.sendFile(
        path.resolve("../client/dist/index.html.gz")
    );
});

commonRoutes.head("/ping", (_req, res) => {
    res.sendStatus(200);
});

commonRoutes.get("/ping", (_req, res) => {
    res
        .status(200)
        .send("ok");
});

export default commonRoutes;
