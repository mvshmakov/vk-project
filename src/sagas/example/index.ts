import { put } from "redux-saga/effects";

import { exampleLoadedAction } from "@/actions/example";
import { loadingStartAction, loadingEndAction } from "@/actions/loading";

export default function* () {
    yield put(loadingStartAction());
    try {
        throw new Error("Example");
    } catch (e) {
        yield put(exampleLoadedAction("example"));
    }
    yield put(loadingEndAction());
}
