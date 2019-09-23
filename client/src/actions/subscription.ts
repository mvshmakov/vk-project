import { createAction } from "redux-actions";

import { TLoadedAction } from "@/entities/Actions";
import { ISubscription } from "@/entities/Subscription";

export const GET_SUBSCRIPTIONS_PENDING: "GET_SUBSCRIPTIONS_PENDING" = "GET_SUBSCRIPTIONS_PENDING";
export const GET_SUBSCRIPTIONS_SUCCESS: "GET_SUBSCRIPTIONS_SUCCESS" = "GET_SUBSCRIPTIONS_SUCCESS";
export const GET_SUBSCRIPTIONS_FAILED: "GET_SUBSCRIPTIONS_FAILED" = "GET_SUBSCRIPTIONS_FAILED";

export const POST_SUBSCRIPTION: "POST_SUBSCRIPTIONS" = "POST_SUBSCRIPTIONS";

export const getSubscriptionsActionPending = createAction(GET_SUBSCRIPTIONS_PENDING);
export const getSubscriptionsActionSuccess = createAction(GET_SUBSCRIPTIONS_SUCCESS,
    (subscriptions: ISubscription[]) => ({ subscriptions })
);
export const getSubscriptionsActionFailed = createAction(GET_SUBSCRIPTIONS_FAILED,
    (error: any) => ({ error })
);

export const postSubscriptionAction = createAction(POST_SUBSCRIPTION,
    (subscription: ISubscription[]) => ({ subscription })
);

export type GetSubscriptionsActionPending = TLoadedAction<typeof GET_SUBSCRIPTIONS_PENDING, {}>;
export type GetSubscriptionsActionSuccess = TLoadedAction<typeof GET_SUBSCRIPTIONS_SUCCESS, { subscriptions: ISubscription[] }>;
export type GetSubscriptionsActionFailed = TLoadedAction<typeof GET_SUBSCRIPTIONS_FAILED, { error: any }>;
export type PostSubscriptionAction = TLoadedAction<typeof POST_SUBSCRIPTION, { subscription: ISubscription }>;

export type TSubscriptionActions =
    | GetSubscriptionsActionPending
    | GetSubscriptionsActionSuccess
    | GetSubscriptionsActionFailed
    | PostSubscriptionAction;