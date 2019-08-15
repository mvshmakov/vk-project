import { pick } from "ramda";
import { Router, Response, Request } from "express";

import { User as UserModel } from "@/models/user";
import { isValidUserModel } from "@/utils/validators";

const userRoutes = Router();

userRoutes.get("/api/v1/users/", (req: Request, res: Response) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send(users || []);
    });
});

userRoutes.get("/api/v1/users/:id", ({ params }: Request, res: Response) => {
    const { id: _id } = params;

    UserModel.findOne({ _id }, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

userRoutes.post("/api/v1/users/", ({ body }: Request, res: Response) => {
    if (!body) {
        res.sendStatus(400);
        return;
    }

    const userFields = pick(["username", "email"], body);

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

userRoutes.delete("/api/v1/users/:id", ({ params }: Request, res: Response) => {
    const { id } = params;

    UserModel.findByIdAndDelete(id, (err, user) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

userRoutes.put("/api/v1/users/:id", ({ params, body }: Request, res: Response) => {
    if (!body) {
        res.sendStatus(400);
        return;
    }

    const { username, email } = body;

    UserModel.findOneAndUpdate(
        { _id: params.id },
        { username, email },
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
