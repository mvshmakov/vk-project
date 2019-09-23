import {
    TSubscriptionActions,
    GET_SUBSCRIPTIONS_PENDING,
    GET_SUBSCRIPTIONS_SUCCESS,
    GET_SUBSCRIPTIONS_FAILED,
    POST_SUBSCRIPTION,
} from "@/actions/subscription";

const initialState = {
    subscriptionsArray: [],
    subscriptionsLoading: false
};

export default (state = initialState, action: TSubscriptionActions) => {
    switch (action.type) {
        case GET_SUBSCRIPTIONS_PENDING:
            return { ...state, subscriptionsLoading: true };
        case GET_SUBSCRIPTIONS_SUCCESS:
            return { subscriptionsArray: action.payload.subscriptions, subscriptionsLoading: false };
        case GET_SUBSCRIPTIONS_FAILED:
            return { error: action.payload.error, subscriptionsLoading: false };
        case POST_SUBSCRIPTION:
            const prevArray = state.subscriptionsArray;
            return {
                ...state,
                subscriptionsArray: [...prevArray, action.payload.subscription]
            };
        default:
            return state;
    }
};