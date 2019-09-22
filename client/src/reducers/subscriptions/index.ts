import { GET_SUBSCRIPTIONS, POST_SUBSCRIPTION, TSubscriptionActions } from "@/actions/subscription";

export default (state = [], action: TSubscriptionActions) => {
    switch (action.type) {
        case GET_SUBSCRIPTIONS:
            return action.payload.subscriptions;
        case POST_SUBSCRIPTION:
            return action.payload.subscription;
        default:
            return state;
    }
};