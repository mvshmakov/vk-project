import { IUser } from "@/entities/User";

const API_BASE_SEARCH = "http://localhost/api/v1/users";

export const getUsers = async (): Promise<IUser[] | undefined> => {
    const response = await fetch(API_BASE_SEARCH, { method: "GET" });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const postUsers = async (username, email): Promise<IUser[] | undefined> => {
    const response = await fetch(API_BASE_SEARCH, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, // TODO: make fetch wrapper to store headers
        body: JSON.stringify({
            username,
            email
        })
    });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};
