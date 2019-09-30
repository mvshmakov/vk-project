import {
    TProfileActions,
    GET_PROFILES_SUCCESS,
    POST_PROFILE,
} from "@/actions/profiles";

export default (state = [], action: TProfileActions) => {
    switch (action.type) {
        case GET_PROFILES_SUCCESS:
            return action.payload.profiles;
        case POST_PROFILE:
            return [...state, action.payload.profile];
        default:
            return state;
    }
};