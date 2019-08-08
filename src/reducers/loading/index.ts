import { LOADING_START, LOADING_END, TLoadingActions } from "@/actions/loading";

export default (state = false, action: TLoadingActions) => {
    switch (action.type) {
        case LOADING_START:
            return true;
        case LOADING_END:
            return false;
        default:
            return state;
    }
};
