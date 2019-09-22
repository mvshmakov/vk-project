import { call, put } from "redux-saga/effects";

import { postSubscription } from "@/api/subscriptions";
import { PostSubscriptionAction, postSubscriptionAction } from "@/actions/subscription";
import { loadingStartAction, loadingEndAction } from "@/actions/loading";

export default function* ({ payload }: PostSubscriptionAction) {
    yield put(loadingStartAction());
    try {
        const subscription = yield call(postSubscription, payload.subscription);
        yield put(postSubscriptionAction(subscription));
    } catch (e) {
        // TODO: show notification
        console.log(e);
        // yield put(postSubscriptionAction({}));
    }
    yield put(loadingEndAction());
}
