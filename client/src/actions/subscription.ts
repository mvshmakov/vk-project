import { createAction } from "redux-actions";

import { ISubscription } from "@/entities/Subscription";
import { TLoadedAction } from "@/utils/typings/Actions";

export const GET_SUBSCRIPTIONS: "root/GET_SUBSCRIPTIONS" = "root/GET_SUBSCRIPTIONS";
export const GET_SUBSCRIPTIONS_SUCCESS: "root/GET_SUBSCRIPTIONS_SUCCESS" = "root/GET_SUBSCRIPTIONS_SUCCESS";
export const GET_SUBSCRIPTIONS_FAILED: "root/GET_SUBSCRIPTIONS_FAILED" = "root/GET_SUBSCRIPTIONS_FAILED";

export const POST_SUBSCRIPTION: "root/POST_SUBSCRIPTIONS" = "root/POST_SUBSCRIPTIONS";
export const POST_SUBSCRIPTION_FAILED: "root/POST_SUBSCRIPTION_FAILED" = "root/POST_SUBSCRIPTION_FAILED";

export const getSubscriptionsAction = createAction(GET_SUBSCRIPTIONS);
export const getSubscriptionsActionSuccess = createAction(GET_SUBSCRIPTIONS_SUCCESS,
    (subscriptions: ISubscription[]) => ({ subscriptions })
);
export const getSubscriptionsActionFailed = createAction(GET_SUBSCRIPTIONS_FAILED);

export const postSubscriptionAction = createAction(POST_SUBSCRIPTION,
    (subscription: ISubscription[]) => ({ subscription })
);
export const postSubscriptionActionFailed = createAction(POST_SUBSCRIPTION_FAILED);

export type GetSubscriptionsAction = TLoadedAction<typeof GET_SUBSCRIPTIONS, {}>;
export type GetSubscriptionsActionSuccess = TLoadedAction<typeof GET_SUBSCRIPTIONS_SUCCESS, { subscriptions: ISubscription[] }>;
export type GetSubscriptionsActionFailed = TLoadedAction<typeof GET_SUBSCRIPTIONS_FAILED, {}>;

export type PostSubscriptionAction = TLoadedAction<typeof POST_SUBSCRIPTION, { subscription: ISubscription }>;
export type PostSubscriptionActionFailed = TLoadedAction<typeof POST_SUBSCRIPTION_FAILED, {}>;

export type TSubscriptionActions =
    | GetSubscriptionsAction
    | GetSubscriptionsActionSuccess
    | GetSubscriptionsActionFailed
    | PostSubscriptionAction
    | PostSubscriptionActionFailed;
