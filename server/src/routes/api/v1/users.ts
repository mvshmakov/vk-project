import { pick } from "ramda";
import { Router } from "express";

import { User as UserModel } from "@/models/user";
import { isValidUserModel } from "@/utils/validators";

const userRoutes = Router();

userRoutes.get("/api/v1/users/", (_req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send(users || []);
    });
});

userRoutes.get("/api/v1/users/:id", ({ params: requestParams }, res) => {
    const { id: _id } = requestParams;

    UserModel.findOne({ _id }, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

userRoutes.post("/api/v1/users/", ({ body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const userFields = pick(["first_name", "last_name", "email", "sex", "city", "country", "photo_100", "photo_200", "role"], requestBody);

    if (!isValidUserModel(userFields)) {
        console.error("invalid user object");
        return;
    }

    const newUser = new UserModel(userFields);

    newUser.save(err => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(newUser);
    });
});

userRoutes.delete("/api/v1/users/:id", ({ params: requestParams }, res) => {
    const { id } = requestParams;

    UserModel.findByIdAndDelete(id, (err, user) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

userRoutes.put("/api/v1/users/:id", ({ params: requestParams, body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const { first_name, last_name, email, sex, city, country, photo_100, photo_200, role } = requestBody;

    UserModel.findOneAndUpdate(
        { _id: requestParams.id },
        { first_name, last_name, email, sex, city, country, photo_100, photo_200, role },
        { new: true },
        (err, user) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
                return;
            }

        res.send(user);
    });
});

export default userRoutes;
