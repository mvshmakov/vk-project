import { ISubscription } from "@/entities/Subscription";
import fetchApi from "@/utils/fetchApi";

class SubscriptionsApiError extends Error {}

export const getSubscriptions = async (): Promise<ISubscription[]> => {
    try {
        return await fetchApi({ route: "/api/v1/subscriptions" });
    } catch (err) {
        throw new SubscriptionsApiError(err);
    }
};

export const postSubscription = async (subscription: ISubscription): Promise<ISubscription> => {
    try {
        return await fetchApi({
            route: "/api/v1/subscriptions",
            settings: {
                method: "POST",
                body: JSON.stringify(subscription)
            }
        });
    } catch (err) {
        throw new SubscriptionsApiError(err);
    }
};
