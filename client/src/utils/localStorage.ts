export const setLocalStorageItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export const getLocalStorageItem = (name: string) => {
    return JSON.parse(localStorage.getItem(name) || "null");
};
