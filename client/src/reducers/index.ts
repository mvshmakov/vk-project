import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import loading from "@/reducers/loading";
import example from "@/reducers/example";
import users from "@/reducers/users";
import feed from "@/reducers/feed";
import initial from "@/reducers/initial";
import profiles from "@/reducers/profiles";
import subscriptions from "@/reducers/subscriptions";

// TODO: make nested structure
// const rootReducer = combineReducers({
//     stuff: combineReducers({
//         innerStuff: combineReducers({
//             something
//         })
//     })
// });

export default (history: History) => combineReducers({
    example,
    loading,
    users,
    feed,
    profiles,
    account: initial,
    subscriptions,
    router: connectRouter(history),
});
