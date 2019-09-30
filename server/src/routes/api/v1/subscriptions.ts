import { pick } from "ramda";
import { Router } from "express";

import { Subscription as SubscriptionModel } from "@/models/subscription";
import { isValidSubscriptionModel } from "@/utils/validators";
// import { isValidUserModel } from "@/utils/validators";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/api/v1/subscriptions/", (_req, res) => {
    SubscriptionModel.find({}, (err, subscriptions) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send(subscriptions || []);
    });
});

subscriptionRoutes.get("/api/v1/subscriptions/:id", ({ params: requestParams }, res) => {
    const { id: _id } = requestParams;

    SubscriptionModel.findOne({ _id }, (err, subscription) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(subscription);
    });
});

subscriptionRoutes.post("/api/v1/subscriptions/", ({ body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const keys = ["subscriptionName", "subscriptionType", "subscriptionColor", "subscriptionBriefDescription",
        "contentType", "subscriptionPrice", "subscriptionPeriod", "stickers", "privateChat", "comments"];

    const subscriptionFields = pick(keys, requestBody);

    if (!isValidSubscriptionModel(subscriptionFields)) {
        console.error("invalid newSubscription object");
        return;
    }

    const newSubscription = new SubscriptionModel(subscriptionFields);

    newSubscription.save(err => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(newSubscription);
    });
});

subscriptionRoutes.delete("/api/v1/subscriptions/:id", ({ params: requestParams }, res) => {
    const { id } = requestParams;

    SubscriptionModel.findByIdAndDelete(id, (err, subscription) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(subscription);
    });
});

subscriptionRoutes.put("/api/v1/subscriptions/:id", ({ params: requestParams, body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const {
        comments,
        stickers,
        contentType,
        privateChat,
        subscriptionName,
        subscriptionType,
        subscriptionColor,
        subscriptionPrice,
        subscriptionPeriod,
        subscriptionBriefDescription,
    } = requestBody;

    SubscriptionModel.findOneAndUpdate(
        { _id: requestParams.id },
        {
            comments, stickers, contentType, privateChat, subscriptionName, subscriptionType,
            subscriptionColor, subscriptionPrice, subscriptionPeriod, subscriptionBriefDescription
        },
        { new: true },
        (err, subscription) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
                return;
            }

            res.send(subscription);
        });
});

export default subscriptionRoutes;
