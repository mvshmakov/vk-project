import mongoose from "mongoose";

// User typings
export type UserDocument = mongoose.Document & {
    username: string,
    email: string,
    profileName: string,
    profileDescription: string,
    category: string,
};

// User Collection
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    profileName: String,
    profileDescription: String,
    category: String,
}, {
    timestamps: true
});

export const User = mongoose.model<UserDocument>("User", userSchema);
