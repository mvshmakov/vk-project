import { call, put } from "redux-saga/effects";

import { loadingStartAction, loadingEndAction } from "@/actions/loading";
import { getFeed } from "@/api/feed";
import { getFeedActionFailed, getFeedActionSuccess } from "@/actions/feed";

export default function*() {
    yield put(loadingStartAction());
    try {
        const feed = yield call(getFeed);
        yield put(getFeedActionSuccess(feed));
    } catch (e) {
        // TODO: show notification
        yield put(getFeedActionFailed());
    }
    yield put(loadingEndAction());
}
