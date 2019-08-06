import { call, put } from "redux-saga/effects";
import MovieDb = require("moviedb-promise");

const API_KEYS = {
    TMDB_API: "test",
};

const moviedb = new MovieDb(API_KEYS.TMDB_API);

export function* searchMovies(action) {
    yield put({ type: "LOADING_START" });
    try {
        const movies = yield call(moviedb.searchMulti, { query: action.query, language: "ru" });
        yield put({ type: "SET_SEARCH_MOVIES", data: movies.results });
    } catch (e) {
        yield put({ type: "SET_SEARCH_MOVIES", data: [] });
    }
    yield put({ type: "LOADING_END" });
}

export function* getPopularMovies(action) {
    yield put({ type: "LOADING_START" });
    try {
        const movies = yield call(moviedb.discoverMovie, { language: "ru" });
        yield put({ type: "SET_POPULAR_MOVIES", data: movies.results });
    } catch (e) {
        yield put({ type: "SET_POPULAR_MOVIES", data: [] });
    }
    yield put({ type: "LOADING_END" });
}

export function* addMovie(action) {
    const movie = yield call(moviedb.movieInfo, { id: action.id, language: "ru" });
    yield put({ type: "ADD_MOVIE" });
}
