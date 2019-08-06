import * as React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import ExamplePanel from "@/components/panels/Example";

import "./styles.scss";

interface IProps {
    id: string;
}
interface IState {
    activePanel: string;
}

export default class SearchView extends React.PureComponent<IProps, IState> {
    state = {
        activePanel: "example1"
    };

    changePanel(activePanel: string) {
        return (...args) => {
            this.setState({ activePanel });
        };
    }

    render() {
        return (
            <View
                id={this.props.id}
                activePanel={this.state.activePanel}
            >
                <ExamplePanel
                    id="example1"
                    onButtonClick={this.changePanel("example2")}
                />
                <ExamplePanel
                    id="example2"
                    onButtonClick={this.changePanel("example1")}
                />
            </View>
        );
    }
}
