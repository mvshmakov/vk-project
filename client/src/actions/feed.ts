import { createAction } from "redux-actions";

import { IPost } from "@/entities/Post";
import { TLoadedAction } from "@/utils/typings/Actions";

export const GET_FEED: "root/GET_FEED" = "root/GET_FEED";
export const GET_FEED_SUCCESS: "root/GET_FEED_SUCCESS" = "root/GET_FEED_SUCCESS";
export const GET_FEED_FAILED: "root/GET_FEED_FAILED" = "root/GET_FEED_FAILED";

export const getFeedAction = createAction(GET_FEED);
export const getFeedActionSuccess = createAction(GET_FEED_SUCCESS,
    (feed: IPost[]) => ({ feed })
);
export const getFeedActionFailed = createAction(GET_FEED_FAILED);

export type GetFeedAction = TLoadedAction<typeof GET_FEED, {}>;
export type GetFeedActionSuccess = TLoadedAction<typeof GET_FEED_SUCCESS, { feed: IPost[] }>;
export type GetFeedActionFailed = TLoadedAction<typeof GET_FEED_FAILED, {}>;

export type TFeedActions =
    | GetFeedAction
    | GetFeedActionSuccess
    | GetFeedActionFailed;
