import {Response, Request, NextFunction} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    // TODO: check for auth
    // res.redirect("/");
    next();
};
