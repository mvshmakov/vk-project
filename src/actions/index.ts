export const searchMovies = (query) => {
    return { type: "FETCH_SEARCH_MOVIES", query };
};

export const getPopularMovies = () => {
    return { type: "FETCH_POPULAR_MOVIES" };
};

export const addBookmarks = (movie) => {
    return { type: "ADD_TO_BOOKMARKS", movie };
};

export const removeBookmarks = (movie) => {
    return { type: "REMOVE_FROM_BOOKMARKS", movie };
};

export const setMovieInfo = (movie) => {
    return { type: "SET_MOVIE_INFO", movie };
};
