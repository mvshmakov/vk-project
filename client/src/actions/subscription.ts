import { createAction } from "redux-actions";

import { TLoadedAction } from "@/entities/Actions";
import { ISubscription } from "@/entities/Subscription";

export const GET_SUBSCRIPTIONS: "GET_SUBSCRIPTIONS" = "GET_SUBSCRIPTIONS";
export const POST_SUBSCRIPTION: "POST_SUBSCRIPTIONS" = "POST_SUBSCRIPTIONS";

export const getSubscriptionAction = createAction(GET_SUBSCRIPTIONS,
    (subscriptions: ISubscription[]) => ({ subscriptions })
);
export const postSubscriptionAction = createAction(POST_SUBSCRIPTION,
    (subscription: ISubscription) => ({ subscription })
);

export type GetSubscriptionsAction = TLoadedAction<typeof GET_SUBSCRIPTIONS, { subscriptions: ISubscription[] }>;
export type PostSubscriptionAction = TLoadedAction<typeof POST_SUBSCRIPTION, { subscription: ISubscription }>;

export type TSubscriptionActions =
    | GetSubscriptionsAction
    | PostSubscriptionAction;