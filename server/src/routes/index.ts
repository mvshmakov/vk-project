import { Router, Response, Request } from "express";
import authMiddleware from "../middlewares/auth";

const commonRoutes = Router();

commonRoutes.get("/", authMiddleware, (req: Request, res: Response) => {
    const responseData = {
        success: true,
        errors: {
            example: "salam, ublydki!",
        }
    };

    res.json(responseData);
});

export default commonRoutes;
