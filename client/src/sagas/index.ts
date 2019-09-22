import { takeEvery } from "redux-saga/effects";

import { SEARCH_USER } from "@/actions/search";
import { EXAMPLE_ACTION } from "@/actions/example";
import { POST_SUBSCRIPTION } from "@/actions/subscription";
import exampleSaga from "@/sagas/example";
import searchSaga from "@/sagas/search";
import subscriptionsSaga from "@/sagas/subscriptions";

export default function* rootSaga() {
    yield takeEvery(SEARCH_USER, searchSaga);
    yield takeEvery(EXAMPLE_ACTION, exampleSaga);
    yield takeEvery(POST_SUBSCRIPTION, subscriptionsSaga);
}
