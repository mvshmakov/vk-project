import { IProfile } from "@/entities/Profile";

const API_BASE_SEARCH = "http://localhost/api/v1/profiles";

export const getProfiles = async (): Promise<IProfile[] | undefined> => {
    const response = await fetch(API_BASE_SEARCH, { method: "GET" });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const postProfile = async (profile: IProfile): Promise<IProfile | undefined> => {
    const response = await fetch(API_BASE_SEARCH, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, // TODO: make fetch wrapper to store headers
        body: JSON.stringify(profile)
    });

    // TODO: rewrite this as helper
    if (!response.ok) {
        console.log("postProfiles");
        throw Error(response.statusText);
    }

    return await response.json();
};
