export const setLocalStorageItem = (name: string, state: any) => {
    localStorage.setItem(name, JSON.stringify(state));
};

export const getLocalStorageItem = (name: string) => {
    return JSON.parse(localStorage.getItem(name) || "null");
};
