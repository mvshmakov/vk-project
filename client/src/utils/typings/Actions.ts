export type TAction<T> = {
    readonly type: T;
};

export type TLoadedAction<T, P> = {
    readonly type: T;
    readonly payload?: P;
};
