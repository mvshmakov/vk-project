import { ISubscription } from "@/entities/Subscription";

const API_BASE_SEARCH = "http://localhost:3000/api/v1/subscriptions";

export const getSubscriptions = async (): Promise<ISubscription[] | undefined> => {
    const response = await fetch(API_BASE_SEARCH, { method: "GET" });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const postSubscription = async (subscription: ISubscription): Promise<ISubscription | undefined> => {
    const response = await fetch(API_BASE_SEARCH, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, // TODO: make fetch wrapper to store headers
        body: JSON.stringify(subscription)
    });

    // TODO: rewrite this as helper
    if (!response.ok) {
        console.log("postSubscriptions");
        throw Error(response.statusText);
    }

    return await response.json();
};
