import * as React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import SearchPanel from "@/containers/panels/Search";
import OnboardingPanel from "@/components/panels/Onboarding";
import { PureView } from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    id: string;
    onQuitOnboarding: (...args) => void;
}
interface IState {
    activePanel: string;
}

export default class OnboardingView extends PureView<IProps, IState> {
    state = {
        activePanel: "start"
    };

    changePanel = (activePanel: string) => {
        return () => {
            this.setState({ activePanel });
        };
    }

    onSearchGroup = () => {
        const activePanel =
            this.state.activePanel === "groupSearch" ? "start" : "groupSearch";

        this.setState({ activePanel });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <OnboardingPanel
                    id="start"
                    onSearchGroupClick={this.onSearchGroup}
                    onButtonClick={() => this.props.onQuitOnboarding(7643)}
                />
                <SearchPanel id="groupSearch" type="general" onSelectUser={this.changePanel("start")} />
            </View>
        );
    }
}
