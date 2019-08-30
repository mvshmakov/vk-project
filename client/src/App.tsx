import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "@vkontakte/vk-connect";
import { ConfigProvider, Epic, Root } from "@vkontakte/vkui";
import { isWebView } from "@vkontakte/vkui/src/lib/webview";
import "@vkontakte/vkui/dist/vkui.css";

import {
    getLocalStorageItem,
    setLocalStorageItem
} from "@/helpers/localStorage";
import Tabbar from "@/components/blocks/Tabbar";

import SearchView from "@/components/views/Search";
import ScheduleView from "@/containers/views/Schedule";
import SettingsView from "@/containers/views/Settings";
import OnboardingView from "@/components/views/Onboarding";
import { fetchUser } from "@/api/search";
import { initUserAction, initScheduleAction } from "@/actions/initial";
import { fetchSchedule } from "@/api/schedule";
import { getUsers } from "@/api/users";

interface IProps {
    pageId: string;
    pushStory: (...args) => {};
    initUserAction: (...args) => {};
    initScheduleAction: (...args) => {};
}
interface IState {
    activePanel: "search" | any;
    onboarding: boolean;
}

class App extends React.PureComponent<IProps, IState> {
    state = {
        activePanel: "search",
        onboarding: !getLocalStorageItem("hse-app-id")
    };

    async componentDidMount() {
        const user = await fetchUser("Шмаков");
        const schedule = await fetchSchedule("Шмаков");

        const backend = await getUsers();
        console.log(backend);

        this.props.initUserAction(user[0]);
        this.props.initScheduleAction(schedule);
    }

    changeView = (activePanel: string) => {
        return () => {
            this.setState({ activePanel });
        };
    }

    onQuitOnboarding = (id: number) => {
        setLocalStorageItem("hse-app-id", id);
        this.setState({ onboarding: false });
    }

    onStoryChange = async e => {
        this.props.pushStory(e.currentTarget.dataset.story);

        if (e.currentTarget.dataset.story === "schedule") {
            const schedule = await fetchSchedule("Шмаков");

            this.props.initScheduleAction(schedule);
        }
    }

    render() {
        if (this.state.onboarding) {
            return (
                <Root activeView="onboarding">
                    <OnboardingView
                        id="onboarding"
                        onQuitOnboarding={this.onQuitOnboarding}
                    />
                </Root>
            );
        }

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
                    <ScheduleView id="schedule" />
                    <SearchView id="search" />
                    <SettingsView id="settings" />
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            initUserAction,
            initScheduleAction,
            pushStory: story => push("/" + story)
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(App);
