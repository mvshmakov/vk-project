import { createAction } from "redux-actions";

import { TLoadedAction } from "@/utils/typings/Actions";
import { IProfile } from "@/entities/Profile";

export const GET_PROFILES: "root/GET_PROFILES" = "root/GET_PROFILES";
export const GET_PROFILES_SUCCESS: "root/GET_PROFILES_SUCCESS" = "root/GET_PROFILES_SUCCESS";
export const GET_PROFILES_FAILED: "root/GET_PROFILES_FAILED" = "root/GET_PROFILES_FAILED";

export const POST_PROFILE: "root/POST_PROFILES" = "root/POST_PROFILES";
export const POST_PROFILE_FAILED: "root/POST_PROFILE_FAILED" = "root/POST_PROFILE_FAILED";

export const getProfilesAction = createAction(GET_PROFILES);
export const getProfilesActionSuccess = createAction(GET_PROFILES_SUCCESS,
    (profiles: IProfile[]) => ({ profiles })
);
export const getProfilesActionFailed = createAction(GET_PROFILES_FAILED);

export const postProfileAction = createAction(POST_PROFILE,
    (profile: IProfile[]) => ({ profile })
);
export const postProfileActionFailed = createAction(POST_PROFILE_FAILED);

export type GetProfilesAction = TLoadedAction<typeof GET_PROFILES, {}>;
export type GetProfilesActionSuccess = TLoadedAction<typeof GET_PROFILES_SUCCESS, { profiles: IProfile[] }>;
export type GetProfilesActionFailed = TLoadedAction<typeof GET_PROFILES_FAILED, {}>;

export type PostProfileAction = TLoadedAction<typeof POST_PROFILE, { profile: IProfile }>;
export type PostProfileActionFailed = TLoadedAction<typeof POST_PROFILE_FAILED, {}>;

export type TProfileActions =
    | GetProfilesAction
    | GetProfilesActionSuccess
    | GetProfilesActionFailed
    | PostProfileAction
    | PostProfileActionFailed;
