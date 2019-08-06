const API_BASE_SEARCH = "https://api.hseapp.ru/gateway/dump/search/";
const API_BASE_RUZ = "https://api.hseapp.ru/gateway/ruz/lessons/";

export const fetchUser = async (username: string) => {
    const response = await fetch(`${API_BASE_SEARCH}?q=${username}`, {
        method: "GET"
    });

    // TODO: rewrite this as helper
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const fetchSchedule = async (student: string) => {
    const response = await fetch(API_BASE_RUZ, {
        method: "GET",
        body: JSON.stringify({
            start: "2019-01-30",
            offset: 14,
            student,
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
};
