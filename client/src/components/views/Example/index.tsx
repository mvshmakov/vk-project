import * as React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import ExamplePanel from "@/components/panels/Example";
import { PureView } from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    id: string;
    exampleAction: any;
}
interface IState {
    activePanel: string;
}

export default class ExampleView extends PureView<IProps, IState> {
    state = {
        activePanel: "example1"
    };

    changePanel(activePanel: string) {
        return (...args) => {
            this.props.exampleAction();
            this.setState({ activePanel });
        };
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
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
