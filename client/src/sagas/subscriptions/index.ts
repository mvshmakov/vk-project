import { call, put } from "redux-saga/effects";

import { postSubscription, getSubscriptions } from "@/api/subscriptions";
import {
    PostSubscriptionAction,
    getSubscriptionsActionSuccess,
    getSubscriptionsActionFailed,
    postSubscriptionActionFailed
} from "@/actions/subscription";
import { loadingStartAction, loadingEndAction } from "@/actions/loading";

export function* getSubscriptionsSaga() {
    yield put(loadingStartAction());
    try {
        const subscriptions = yield call(getSubscriptions);
        yield put(getSubscriptionsActionSuccess(subscriptions));
    } catch (err) {
        // TODO: show notification
        yield put(getSubscriptionsActionFailed());
    }
    yield put(loadingEndAction());
}

export function* postSubscriptionSaga({ payload }: PostSubscriptionAction) {
    yield put(loadingStartAction());
    try {
        yield call(postSubscription, payload.subscription);
    } catch (err) {
        // TODO: show notification
        yield put(postSubscriptionActionFailed());
    }
    yield put(loadingEndAction());
}
