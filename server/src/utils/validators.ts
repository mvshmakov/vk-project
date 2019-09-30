import { check, sanitize, validationResult } from "express-validator";

export const isValidUserModel = user => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({ min: 1 });

    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    return validationResult(user);
};

export const isValidSubscriptionModel = subscription => {
    check("subscriptionName", "subscriptionName is not blank").isLength({ min: 1 }).isString();
    check("subscriptionType", "subscriptionType is not blank").isLength({ min: 1 }).isString();
    check("subscriptionColor", "subscriptionColor is not blank").isLength({ min: 1 }).isString();
    check("subscriptionBriefDescription", "subscriptionBriefDescription is not blank").isLength({ min: 1 }).isString();
    check("contentType", "contentType is not blank").isLength({ min: 1 }).isString();
    check("subscriptionPrice", "subscriptionPrice is not blank").isLength({ min: 1 }).isString();
    check("subscriptionPeriod", "subscriptionPeriod is not blank").isLength({ min: 1 }).isString();
    check("stickers", "stickers is not blank").isLength({ min: 1 }).isBoolean();
    check("privateChat", "privateChat is not blank").isLength({ min: 1 }).isBoolean();
    check("comments", "comments is not blank").isLength({ min: 1 }).isBoolean();
    return validationResult(subscription);
};

export const isValidProfileModel = profile => {
    check("ownerId", "ownerId is not blank").isLength({ min: 1 }).isString();
    check("profileName", "profileName is not blank").isLength({ min: 1 }).isString();
    check("profileDescription", "profileDescription is not blank").isLength({ min: 1 }).isString();
    check("profileСategory", "profileСategory is not blank").isLength({ min: 1 }).isString();
    check("avatar_url", "avatar_url is not blank").isLength({ min: 1 }).isURL();
    return validationResult(profile);
};

export const isValidPostModel = post => {
    check("text", "text is not valid").isString();
    check("video", "video url is not blank").isLength({ min: 1 }).isURL();
    check("audio", "audio url is not blank").isLength({ min: 1 }).isURL();
    check("img", "img url is not blank").isLength({ min: 1 }).isURL();
    return validationResult(post);
};
