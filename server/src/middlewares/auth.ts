import {Response, Request, NextFunction} from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    // TODO: check for auth
    next();
};
