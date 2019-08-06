import * as React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { ConfigProvider, Epic } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { isWebView } from "@vkontakte/vkui/src/lib/webview";

import Tabbar from "@/components/blocks/Tabbar";
import SearchView from "@/components/views/Search";
import ExampleView from "@/components/views/Example";

interface IProps {
    pageId: string;
    dispatch: (...args) => any; // избавиться от этого говна
}
interface IState {
    activePanel: "search" | any;
}

class App extends React.PureComponent<IProps, IState> {
    state = {
        activePanel: "search"
    };

    changeView(activePanel: string) {
        return (...args) => {
            this.setState({ activePanel });
        };
    }

    onStoryChange = e => {
        return this.props.dispatch(push("/" + e.currentTarget.dataset.story));
    }

    render() {
        const activeRoute = this.props.pageId || "search";

        // TODO: отдавать таббару массив роутов
        return (
            <ConfigProvider isWebView={isWebView}>
                <Epic
                    activeStory={activeRoute}
                    tabbar={
                        <Tabbar
                            activeRoute={activeRoute}
                            onStoryChange={this.onStoryChange}
                        />
                    }
                >
                    <SearchView id="search" />
                    <ExampleView id="example" />
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(App);
