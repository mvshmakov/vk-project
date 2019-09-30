import mongoose from "mongoose";

// Profile typings
export type ProfileDocument = mongoose.Document & {
    ownerId: number | string,
    profileName: string,
    profileDescription: string,
    profileСategory: string,
    avatar_url: string,
};

// Profile Collection
const profileSchema = new mongoose.Schema({
    ownerId: String,
    profileName: {
        type: String,
        unique: true
    },
    profileDescription: String,
    profileСategory: String,
    avatar_url: String,
}, {
    timestamps: true
});

export const Profile = mongoose.model<ProfileDocument>("Profile", profileSchema);
