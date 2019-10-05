import { pick } from "ramda";
import { Router } from "express";

import { Post as PostModel } from "@/models/post";
import { isValidPostModel } from "../../../utils/validators";
import userRoutes from "./users";

const postRoutes = Router();

postRoutes.get("/api/v1/posts/", (_req, res) => {
    PostModel.find({}, (err, posts) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send(posts || []);
    });
});

postRoutes.post("/api/v1/posts/", ({ body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const postFields = pick(["attachments", "name", "avatar"], requestBody);

    if (!isValidPostModel) {
        console.error("invalid post object");
        return;
    }

    const newPost = new PostModel(postFields);

    newPost.save(err => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(newPost);
    });
});

userRoutes.delete("/api/v1/posts/:id", ({ params: requestParams }, res) => {
    const { id } = requestParams;

    PostModel.findByIdAndDelete(id, (err, post) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(post);
    });
});

export default postRoutes;
