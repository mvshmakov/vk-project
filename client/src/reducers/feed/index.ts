import {
    TFeedActions,
    GET_FEED_SUCCESS
} from "@/actions/feed";

export default (state = [], action: TFeedActions) => {
    switch (action.type) {
        case GET_FEED_SUCCESS:
            return action.payload.feed;
        default:
            return state;
    }
};
