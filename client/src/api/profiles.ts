import { IProfile } from "@/entities/Profile";
import fetchApi from "@/utils/fetchApi";

class ProfilesApiError extends Error { }

export const getProfiles = async (): Promise<IProfile[]> => {
    try {
        return await fetchApi({ route: "/api/v1/profiles" });
    } catch (err) {
        throw new ProfilesApiError(err);
    }
};

export const postProfile = async (profile: IProfile): Promise<IProfile> => {
    try {
        return await fetchApi({
            route: "/api/v1/profiles",
            settings: {
                method: "POST",
                body: JSON.stringify(profile)
            }
        });
    } catch (err) {
        throw new ProfilesApiError(err);
    }
};
