import { pick } from "ramda";
import { Router } from "express";

import { Profile as ProfileModel } from "@/models/profile";
import { isValidProfileModel } from "@/utils/validators";

const profileRoutes = Router();

profileRoutes.get("/api/v1/profiles/", (_req, res) => {
    ProfileModel.find({}, (err, profiles) => {
        if (err) {
            console.error(err);
            return;
        }

        res.send(profiles || []);
    });
});

profileRoutes.get("/api/v1/profiles/:id", ({ params: requestParams }, res) => {
    const { id: _id } = requestParams;

    ProfileModel.findOne({ _id }, (err, profile) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(profile);
    });
});

profileRoutes.post("/api/v1/profiles/", ({ body: requestBody }, res) => {
    if (!requestBody) {
        res.sendStatus(400);
        return;
    }

    const profileFields = pick(["ownerId", "profileName", "profileDescription", "profileСategory", "avatar_url"], requestBody);

    if (!isValidProfileModel(profileFields)) {
        console.error("invalid profile object");
        return;
    }

    const newProfile = new ProfileModel(profileFields);

    newProfile.save(err => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            return;
        }

        res.send(newProfile);
    });
});

profileRoutes.delete("/api/v1/profiles/:id", ({ params: requestParams }, res) => {
    const { id } = requestParams;

    ProfileModel.findByIdAndDelete(id, (err, profile) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(profile);
    });
});

export default profileRoutes;
