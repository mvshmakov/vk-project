import mongoose from "mongoose";

// Post typings
export type PostDocument = mongoose.Document & {
    text: string;
    video: string;
    audio: string;
    img: string;
};

// Post Collection
const postSchema = new mongoose.Schema({
    text: String,
    video: String,
    audio: String,
    img: String
}, {
    timestamps: true
});

export const Post = mongoose.model<PostDocument>("Post", postSchema);
