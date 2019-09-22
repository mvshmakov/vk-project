import mongoose from "mongoose";

// User typings
export type UserDocument = mongoose.Document & {
    username: string,
    email: string,
    role: string;
    profileName: string,
    profileDescription: string,
    category: string,
    avatar_url: string,
};

// User Collection
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    profileName: String,
    profileDescription: String,
    category: String,
    avatar_url: String,
}, {
    timestamps: true
});

export const User = mongoose.model<UserDocument>("User", userSchema);
