import { createAction } from "redux-actions";

import { TLoadedAction } from "@/entities/Actions";
import { IUser } from "@/entities/User";
import { ILesson } from "@/entities/Lesson";

export const INIT_USER: "INIT_USER" = "INIT_USER";
export const INIT_SCHEDULE: "INIT_SCHEDULE" = "INIT_SCHEDULE";

type TInitUserPayload = {
    user: IUser;
};

type TInitSchedulePayload = {
    schedule: ILesson[];
};

export const initUserAction = createAction(INIT_USER, (user: IUser) => ({ user }));
export const initScheduleAction = createAction(INIT_SCHEDULE, (schedule: ILesson[]) => ({ schedule }));

export type TInitialActions =
    | TLoadedAction<typeof INIT_USER, TInitUserPayload>
    | TLoadedAction<typeof INIT_SCHEDULE, TInitSchedulePayload>;
