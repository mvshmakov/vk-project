export interface ISubscription {
    subscriptionName: string;
    subscriptionType: string;
    subscriptionColor: string;
    subscriptionBriefDescription: string;
    contentType: string;
    subscriptionPrice: string;
    subscriptionPeriod: string;
    stickers: boolean;
    privateChat: boolean;
    comments: boolean;

    isSubscriptionNameFieldEmpty?: boolean;
    isSubscriptionPriceFieldEmpty?: boolean;
    isSubscriptionPeriodFieldEmpty?: boolean;
}
