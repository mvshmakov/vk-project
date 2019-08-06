const initialState = {
    accessToken: "",
    friends: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ACCESS_TOKEN":
            return state;
        case "FETCH_FRIENDS":
            return state;
        default:
            return state;
    }
};

export default reducer;
