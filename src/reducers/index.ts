import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import loading from "@/reducers/loading";
import movies from "@/reducers/movies";
import vk from "@/reducers/vk";

export default (history) => combineReducers({
    router: connectRouter(history),
    vk, movies, loading
});
