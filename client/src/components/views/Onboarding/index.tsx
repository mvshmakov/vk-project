import * as React from "react";
import { connect } from "react-redux";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { IUser } from "@/entities/User";
import { PureView } from "@/utils/typings/Components";
import SearchPanel from "@/containers/panels/Search";
import OnboardingPanel from "@/components/panels/Onboarding";
import CreateProfilePanel from "@/containers/panels/CreateProfile";

import "./styles.scss";

export interface IStateProps {
    currentUser: IUser;
}

interface IProps {
    id: string;
    onQuitOnboarding: (...args) => void;
}
interface IState {
    activePanel: string;
}

export default class OnboardingView extends PureView<IProps & IStateProps, IState> {
    constructor(props) {
        super(props);
    }

    state = {
        activePanel: "start"
    };

    changePanel = (activePanel: string) => {
        return () => {
            this.setState({ activePanel });
        };
    }

    onSearchGroup = () => {
        const activePanel = this.state.activePanel === "groupSearch" ? "start" : "groupSearch";

        this.setState({ activePanel });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <OnboardingPanel
                    id="start"
                    currentUser={this.props.currentUser}
                    onCreateSubscriberClick={() => this.props.onQuitOnboarding(7643)}
                    onCreateContentMakerClick={this.changePanel("create")}
                />
                <CreateProfilePanel
                    id="create"
                    currentUser={this.props.currentUser}
                    onSearchGroupClick={this.onSearchGroup}
                    onButtonClick={() => this.props.onQuitOnboarding(7643)}
                    onBackButtonClick={this.changePanel("start")}
                />
                <SearchPanel
                    id="groupSearch"
                    type="general"
                    onSelectUser={this.changePanel("create")}
                />
            </View>
        );
    }
}
