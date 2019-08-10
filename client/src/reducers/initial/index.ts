import { INIT_USER, INIT_SCHEDULE, TInitialActions } from "@/actions/initial";

export default (state = {}, action: TInitialActions) => {
    switch (action.type) {
        case INIT_USER:
            return {
                ...state,
                user: action.payload.user
            };
        case INIT_SCHEDULE:
            return {
                ...state,
                schedule: action.payload.schedule
            };
        default:
            return state;
    }
};
