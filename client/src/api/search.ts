import { IUser } from "@/entities/User";

const API_BASE_SEARCH = "https://api.hseapp.ru/gateway/dump/search/";

export const fetchUser = async (username: string): Promise<IUser[] | undefined> => {
    const response = await fetch(`${API_BASE_SEARCH}?q=${username}`, {
        method: "GET"
    });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};
