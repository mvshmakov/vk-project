import { pick } from "ramda";
import { Router } from "express";

import { Subscription as SubscriptionModel } from "@/models/subscription";
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
        console.log("subscriptionRoutes1", requestBody);
        res.sendStatus(400);
        return;
    }

    const keys = ["subscriptionName", "subscriptionType", "subscriptionColor", "subscriptionBriefDescription",
        "contentType", "subscriptionPrice", "subscriptionPeriod", "stickers", "privateChat", "comments"];

    const subscriptionFields = pick(keys, requestBody);

    // if (!isValidUserModel(userFields)) {
    //     console.error("invalid user object");
    //     return;
    // }

    const newSubscription = new SubscriptionModel(subscriptionFields);

    newSubscription.save(err => {
        if (err) {
            console.error(err);
            console.log("subscriptionRoutes2");
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

// subscriptionRoutes.put("/api/v1/subscriptions/:id", ({ params: requestParams, body: requestBody }, res) => {
//     if (!requestBody) {
//         res.sendStatus(400);
//         return;
//     }

//     const { username, email } = requestBody;

//     SubscriptionModel.findOneAndUpdate(
//         { _id: requestParams.id },
//         { username, email },
//         { new: true },
//         (err, user) => {
//             if (err) {
//                 console.log(err);
//                 res.sendStatus(400);
//                 return;
//             }

//         res.send(user);
//     });
// });

export default subscriptionRoutes;
