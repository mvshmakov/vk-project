import { createAction } from "redux-actions";
import { TAction } from "@/utils/typings/Actions";

export const LOADING_START: "LOADING_START" = "LOADING_START";
export const LOADING_END: "LOADING_END" = "LOADING_END";

export const loadingStartAction = createAction(LOADING_START);
export const loadingEndAction = createAction(LOADING_END);

export type TLoadingActions =
    | TAction<typeof LOADING_START>
    | TAction<typeof LOADING_END>;
