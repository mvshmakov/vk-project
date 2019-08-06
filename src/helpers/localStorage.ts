export const saveState = (name: string, state: any) => {
    localStorage.setItem(name, JSON.stringify(state));
};

export const getState = (name: string) => {
    return JSON.parse(localStorage.getItem(name) || "null");
};
