import mongoose from "mongoose";

// User typings
export type UserDocument = mongoose.Document & {
    first_name: string,
    last_name: string,
    email: string,
    sex: number,
    city: {
        id: number,
        title: string,
    }
    country: {
        id: number,
        title: string,
    }
    photo_100: string,
    photo_200: string,
    role: string,
};

// User Collection
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    sex: Number,
    city: {
        id: Number,
        title: String,
    },
    country: {
        id: Number,
        title: String,
    },
    photo_100: String,
    photo_200: String,
    role: String,
}, {
    timestamps: true
});

export const User = mongoose.model<UserDocument>("User", userSchema);
