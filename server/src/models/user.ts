import mongoose from "mongoose";

// User typings
export type UserDocument = mongoose.Document & {
    username: string,
    email: string
};

// User Collection
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

export const User = mongoose.model<UserDocument>("User", userSchema);
