import mongoose from "mongoose";

// Subscription typings
export type SubscriptionDocument = mongoose.Document & {
    subscriptionName: string,
    subscriptionType: string,
    subscriptionColor: string,
    subscriptionBriefDescription: string,
    contentType: string,
    subscriptionPrice: string,
    subscriptionPeriod: string,
    stickers: boolean,
    privateChat: boolean,
    comments: boolean,
};

// Subscription Collection
const subscriptionSchema = new mongoose.Schema({
    subscriptionName: {
        type: String,
        unique: true
    },
    subscriptionType: String,
    subscriptionColor: String,
    subscriptionBriefDescription: String,
    contentType: String,
    subscriptionPrice: String,
    subscriptionPeriod: String,
    stickers: Boolean,
    privateChat: Boolean,
    comments: Boolean,
});

export const Subscription = mongoose.model<SubscriptionDocument>("Subscription", subscriptionSchema);
