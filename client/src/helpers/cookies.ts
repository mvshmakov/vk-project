import Cookies from "js-cookie";

type Options = {
    expires?: number,
    path?: string
};

export const setCookie = (name: string, value: any, options: Options = {}): void => {
    Cookies.set(name, value, options);
};

export const getCookie = (name: string): void => {
    Cookies.get(name);
};
