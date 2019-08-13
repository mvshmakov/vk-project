import { Router, Response, Request } from "express";
import { check, sanitize, validationResult } from "express-validator";

const userRoutes = Router();

userRoutes.get("/user", (req: Request, res: Response) => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({ min: 1 });
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error("some shit during logging");
        return res.redirect("/login");
    }

    res.redirect("/");
});

export default userRoutes;
