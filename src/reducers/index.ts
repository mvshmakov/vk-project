import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import loading from "@/reducers/loading";
import example from "@/reducers/example";
import users from "@/reducers/users";
import user from "@/reducers/user";
import group from "@/reducers/group";
import initial from "@/reducers/initial";

export default (history) => combineReducers({
    example,
    loading,
    users,
    user,
    group,
    account: initial,
    router: connectRouter(history),
});
