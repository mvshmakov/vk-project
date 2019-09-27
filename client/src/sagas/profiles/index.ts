import { call, put } from "redux-saga/effects";

import { postProfile, getProfiles } from "@/api/profiles";
import {
    PostProfileAction,
    getProfilesActionSuccess,
    getProfilesActionFailed,
    postProfileActionFailed
} from "@/actions/profiles";
import { loadingStartAction, loadingEndAction } from "@/actions/loading";

export function* getProfilesSaga() {
    yield put(loadingStartAction());
    try {
        const profiles = yield call(getProfiles);
        yield put(getProfilesActionSuccess(profiles));
    } catch (e) {
        // TODO: show notification
        yield put(getProfilesActionFailed());
    }
    yield put(loadingEndAction());
}

export function* postProfileSaga({ payload }: PostProfileAction) {
    yield put(loadingStartAction());
    try {
        yield call(postProfile, payload.profile);
    } catch (e) {
        // TODO: show notification
        yield put(postProfileActionFailed());
    }
    yield put(loadingEndAction());
}
