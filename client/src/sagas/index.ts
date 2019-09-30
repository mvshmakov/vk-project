import { takeEvery } from "redux-saga/effects";

import { GET_FEED } from "@/actions/feed";
import { SEARCH_USER } from "@/actions/search";
import { EXAMPLE_ACTION } from "@/actions/example";
import { GET_PROFILES, POST_PROFILE } from "@/actions/profiles";
import { GET_SUBSCRIPTIONS, POST_SUBSCRIPTION } from "@/actions/subscription";

import getFeedSaga from "@/sagas/feed";
import searchSaga from "@/sagas/search";
import exampleSaga from "@/sagas/example";
import { getProfilesSaga, postProfileSaga } from "@/sagas/profiles";
import { getSubscriptionsSaga, postSubscriptionSaga } from "@/sagas/subscriptions";

export default function* rootSaga() {
    yield takeEvery(GET_FEED, getFeedSaga);
    yield takeEvery(SEARCH_USER, searchSaga);
    yield takeEvery(EXAMPLE_ACTION, exampleSaga);
    yield takeEvery(GET_SUBSCRIPTIONS, getSubscriptionsSaga);
    yield takeEvery(POST_SUBSCRIPTION, postSubscriptionSaga);
    yield takeEvery(GET_PROFILES, getProfilesSaga);
    yield takeEvery(POST_PROFILE, postProfileSaga);
}
