import { IPost } from "@/entities/Post";
import fetchApi from "@/utils/fetchApi";

class FeedApiError extends Error { }

export const getFeed = async (): Promise<IPost[]> => {
    try {
        return await fetchApi({ route: "/api/v1/posts" });
    } catch (err) {
        throw new FeedApiError(err);
    }
};
