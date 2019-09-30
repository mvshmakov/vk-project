import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import rootSaga from "@/sagas";
import createRootReducer from "@/reducers";
import { GetInnerStoreType } from "@/utils/typings/Extractors";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    createRootReducer(history),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        ),
    )
);

export type TStore = GetInnerStoreType<typeof store>;

sagaMiddleware.run(rootSaga);
