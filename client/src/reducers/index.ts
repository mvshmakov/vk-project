import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import loading from "@/reducers/loading";
import example from "@/reducers/example";
import users from "@/reducers/users";
import feed from "@/reducers/feed";
import initial from "@/reducers/initial";
import subscriptions from "@/reducers/subscriptions";

export default (history: History) => combineReducers({
    example,
    loading,
    users,
    feed,
    account: initial,
    subscriptions,
    router: connectRouter(history),
});
