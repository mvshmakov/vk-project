import { createAction } from "redux-actions";
import { TAction, TLoadedAction } from "@/utils/typings/Actions";

export const EXAMPLE_ACTION: "EXAMPLE_ACTION" = "EXAMPLE_ACTION";
export const EXAMPLE_LOADED_ACTION: "EXAMPLE_LOADED_ACTION" = "EXAMPLE_LOADED_ACTION";

type ExamplePayload = {
    example: string;
};

export const exampleAction = createAction(EXAMPLE_ACTION);
export const exampleLoadedAction = createAction(EXAMPLE_LOADED_ACTION, (example: string) => ({ example }));

export type TExampleActions =
    | TAction<typeof EXAMPLE_ACTION>
    | TLoadedAction<typeof EXAMPLE_LOADED_ACTION, ExamplePayload>;
