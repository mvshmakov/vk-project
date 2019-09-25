import { IPost } from "@/entities/Post";

const API_BASE_SEARCH = "http://localhost/api/v1/posts";

export const getFeed = async (): Promise<IPost[] | undefined> => {
    const response = await fetch(API_BASE_SEARCH, { method: "GET" });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};
