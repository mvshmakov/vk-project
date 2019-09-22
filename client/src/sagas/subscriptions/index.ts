// import { call, put } from "redux-saga/effects";

// import { getSubscriptions } from "@/api/subscriptions";
// import { getSubscriptionAction, GetSubscriptionsAction } from "@/actions/subscription";
// import { loadingStartAction, loadingEndAction } from "@/actions/loading";

// export default function* ({ payload }: GetSubscriptionsAction) {
//     yield put(loadingStartAction());
//     try {
//         const subscriptions = yield call(getSubscriptions);
//         yield put(getSubscriptionAction(subscriptions));
//     } catch (e) {
//         // TODO: show notification
//         yield put(getSubscriptionAction([]));
//     }
//     yield put(loadingEndAction());
// }
