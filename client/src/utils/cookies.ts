import Cookies from "js-cookie";

export const setCookie = (
    name: string,
    value: string | object,
    options: Cookies.CookieAttributes = {}
): void => {
    Cookies.set(name, value, options);
};

export const getCookie = (name: string): string => {
    return Cookies.get(name);
};
