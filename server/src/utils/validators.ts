import { check, sanitize, validationResult } from "express-validator";

export const isValidUserModel = user => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({ min: 1 });

    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    return validationResult(user);
};

export const isValidPostModel = post => {
    check("text", "text is not valid").isString();
    check("video", "video url is not blank").isLength({ min: 1 }).isURL();
    check("audio", "audio url is not blank").isLength({ min: 1 }).isURL();
    check("img", "img url is not blank").isLength({ min: 1 }).isURL();
    return validationResult(post);
};
