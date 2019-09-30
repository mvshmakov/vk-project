import { Store } from "redux";

export type GetInnerStoreType<S> = S extends Store<infer T> ? T : never;
