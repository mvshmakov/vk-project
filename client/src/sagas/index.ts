import { takeEvery } from "redux-saga/effects";

import { SEARCH_USER } from "@/actions/search";
import { EXAMPLE_ACTION } from "@/actions/example";
import { GET_SUBSCRIPTIONS_PENDING, POST_SUBSCRIPTION } from "@/actions/subscription";
import {getSubscriptionsSaga, postSubscriptionSaga} from "@/sagas/subscriptions";
import exampleSaga from "@/sagas/example";
import searchSaga from "@/sagas/search";

export default function* rootSaga() {
    yield takeEvery(SEARCH_USER, searchSaga);
    yield takeEvery(EXAMPLE_ACTION, exampleSaga);
    yield takeEvery(GET_SUBSCRIPTIONS_PENDING, getSubscriptionsSaga);
    yield takeEvery(POST_SUBSCRIPTION, postSubscriptionSaga);
}
