import {
    TSubscriptionActions,
    GET_SUBSCRIPTIONS_SUCCESS,
    POST_SUBSCRIPTION,
} from "@/actions/subscription";

export default (state = [], action: TSubscriptionActions) => {
    switch (action.type) {
        case GET_SUBSCRIPTIONS_SUCCESS:
            return action.payload.subscriptions;
        case POST_SUBSCRIPTION:
            return [...state, action.payload.subscription];
        default:
            return state;
    }
};