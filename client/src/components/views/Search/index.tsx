import * as React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { PureView } from "@/utils/typings/Components";
import SearchPanel from "@/containers/panels/Search";
import ExamplePanel from "@/components/panels/Example";

import "./styles.scss";

interface IProps {
    id: string;
}
interface IState {
    activePanel: string;
}

export default class SearchView extends PureView<IProps, IState> {
    state = {
        activePanel: "search"
    };

    changePanel(activePanel: string) {
        return () => {
            this.setState({ activePanel });
        };
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <SearchPanel
                    id="search"
                    type="general"
                    onSelectUser={this.changePanel("example")}
                />
                <ExamplePanel
                    id="example"
                    onButtonClick={this.changePanel("search")}
                />
            </View>
        );
    }
}
