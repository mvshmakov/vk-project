import { EXAMPLE_LOADED_ACTION, TExampleActions } from "@/actions/example";

const initialState = {
    example: "default",
};

export default (state = initialState, action: TExampleActions) => {
    switch (action.type) {
        case EXAMPLE_LOADED_ACTION:
            return {
                ...state,
                example: action.payload.example
            };
        default:
            return state;
    }
};
