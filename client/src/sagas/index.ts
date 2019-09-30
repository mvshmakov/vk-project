import { takeEvery } from "redux-saga/effects";

import { GET_FEED } from "@/actions/feed";
import { SEARCH_USER } from "@/actions/search";
import { EXAMPLE_ACTION } from "@/actions/example";
import { GET_SUBSCRIPTIONS, POST_SUBSCRIPTION } from "@/actions/subscription";
import { getSubscriptionsSaga, postSubscriptionSaga } from "@/sagas/subscriptions";
import exampleSaga from "@/sagas/example";
import searchSaga from "@/sagas/search";
import getFeedSaga from "@/sagas/feed";

export default function* rootSaga() {
    yield takeEvery(SEARCH_USER, searchSaga);
    yield takeEvery(EXAMPLE_ACTION, exampleSaga);
    yield takeEvery(GET_SUBSCRIPTIONS, getSubscriptionsSaga);
    yield takeEvery(GET_FEED, getFeedSaga);
    yield takeEvery(POST_SUBSCRIPTION, postSubscriptionSaga);
}
