import { SET_USERS, TSearchActions } from "@/actions/search";

export default (state = [], action: TSearchActions) => {
    switch (action.type) {
        case SET_USERS:
            return action.payload.users;
        default:
            return state;
    }
};
