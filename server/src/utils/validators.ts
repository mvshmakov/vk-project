import { check, sanitize, validationResult } from "express-validator";

export const isValidUserModel = user => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({ min: 1 });

    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    return validationResult(user);
};
