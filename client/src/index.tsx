import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { AppContainer } from "react-hot-loader";

import App from "@/App";
import { store, history } from "@/store";
import registerServiceWorker from "@/helpers/serviceWorker";

const renderApp = (AppComponent: any) => {
    const rootEl = document.getElementById("root");

    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route
                    path="/:pageId?"
                    component={props => (
                        <AppContainer>
                            <AppComponent pageId={props.match.params.pageId} />
                        </AppContainer>
                    )}
                />
            </ConnectedRouter>
        </Provider>,
        rootEl
    );
};

renderApp(App);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./App", () => {
        renderApp(require("./App").default);
    });
}

// For cache
registerServiceWorker();
