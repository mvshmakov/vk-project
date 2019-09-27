import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import loading from "@/reducers/loading";
import example from "@/reducers/example";
import users from "@/reducers/users";
import group from "@/reducers/group";
import feed from "@/reducers/feed";
import initial from "@/reducers/initial";
import profiles from "@/reducers/profiles";
import subscriptions from "@/reducers/subscriptions";

export default (history) => combineReducers({
    example,
    loading,
    users,
    group,
    feed,
    profiles,
    account: initial,
    subscriptions,
    router: connectRouter(history),
});
