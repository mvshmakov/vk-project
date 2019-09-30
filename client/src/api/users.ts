import { IUser } from "@/entities/User";
import fetchApi from "@/utils/fetchApi";

class UsersApiError extends Error { }

export const getUsers = async (): Promise<IUser[]> => {
    try {
        return await fetchApi({ route: "/api/v1/users" });
    } catch (err) {
        throw new UsersApiError(err);
    }
};

export const postUsers = async (username: string, email: string): Promise<IUser[]> => {
    try {
        return await fetchApi({
            route: "/api/v1/users",
            settings: {
                method: "POST",
                body: JSON.stringify({ username, email })
            }
        });
    } catch (err) {
        throw new UsersApiError(err);
    }
};
