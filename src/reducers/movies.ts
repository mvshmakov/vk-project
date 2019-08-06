const Immutable = require("seamless-immutable");
import { getState } from "../helpers/localStorage";

const initialState = Immutable({
    searchQuery: "",
    search: [],
    popular: [],
    movie: {},
    openMovieInfo: false,
    bookmarks: getState("bookmarks") || [],
    friends: [],
    all: []
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_SEARCH_MOVIES":
            return state.merge({ searchQuery: action.query });
        case "SET_SEARCH_MOVIES":
            return state.merge({ search: action.data });
        case "SET_POPULAR_MOVIES":
            return state.merge({ popular: action.data });
        case "ADD_TO_BOOKMARKS":
            return state.merge({ bookmarks: state.bookmarks.concat([action.movie]) });
        case "REMOVE_FROM_BOOKMARKS":
            return state.merge({ bookmarks: state.bookmarks.filter((m) => m.id !== action.movie.id) });
        case "SET_MOVIE_INFO":
            return state.merge({ movie: action.movie });
        default:
            return state;
    }
};

export default reducer;
