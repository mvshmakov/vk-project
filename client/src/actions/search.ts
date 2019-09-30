import { createAction } from "redux-actions";

import { IUser } from "@/entities/User";
import { TLoadedAction } from "@/utils/typings/Actions";

export const SEARCH_USER: "SEARCH_USER" = "SEARCH_USER";
export const SET_USERS: "SET_USERS" = "SET_USERS";

export const searchUserAction = createAction(SEARCH_USER, (username: string) => ({ username }));
export const setUsersAction = createAction(SET_USERS, (users: IUser[]) => ({ users }));

export type SearchUserAction = TLoadedAction<typeof SEARCH_USER, { username: string }>;
export type SetUsersAction = TLoadedAction<typeof SET_USERS, { users: IUser[] }>;

export type TSearchActions =
    | SearchUserAction
    | SetUsersAction;
