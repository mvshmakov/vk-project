import { call, put } from "redux-saga/effects";

import { fetchUser } from "@/api/search";
import { setUsersAction, SearchUserAction } from "@/actions/search";
import { loadingStartAction, loadingEndAction } from "@/actions/loading";

export default function* ({ payload }: SearchUserAction) {
    yield put(loadingStartAction());
    try {
        const users = yield call(fetchUser, payload.username);
        yield put(setUsersAction(users));
    } catch (e) {
        // TODO: show notification
        yield put(setUsersAction([]));
    }
    yield put(loadingEndAction());
}
