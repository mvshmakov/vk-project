import { format } from "date-fns";
import { Path, LocationState } from "history";
import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

import "@vkontakte/vk-connect";
import VKConnect from "@vkontakte/vkui-connect-mock";
import { ConfigProvider, Epic, Root } from "@vkontakte/vkui";
import { isWebView } from "@vkontakte/vkui/src/lib/webview";
import "@vkontakte/vkui/dist/vkui.css";

import {
    getLocalStorageItem,
    setLocalStorageItem
} from "@/utils/localStorage";

import Tabbar from "@/components/blocks/Tabbar";
import SearchView from "@/components/views/Search";
import OnboardingView from "@/components/views/Onboarding";
import ProfileView from "@/containers/views/Profile";
import ScheduleView from "@/containers/views/Schedule";
import SettingsView from "@/containers/views/Settings";
import { getUsers } from "@/api/users";
import { fetchSchedule } from "@/api/schedule";
import { getSubscriptionsAction, TSubscriptionActions } from "@/actions/subscription";
import {
    initUserAction,
    initScheduleAction,
    TInitialActions
} from "@/actions/initial";

interface IProps {
    pageId: string;
    pushStory: typeof pushStory;
    initUserAction: typeof initUserAction;
    initScheduleAction: typeof initScheduleAction;
    getSubscriptionsAction: typeof getSubscriptionsAction;
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
        const schedule = await fetchSchedule("Шмаков");
        const user = await getUsers();

        VKConnect.subscribe(event => {
            if (event.detail.type === "VKWebAppGetUserInfoResult") {
                console.log(event);
            }
        });
        VKConnect.send("VKWebAppGetUserInfo", {});

        console.log(
            format(new Date(), "'Today is a' iiii")
        );

        this.props.initUserAction(user[0]);
        this.props.initScheduleAction(schedule);
        this.props.getSubscriptionsAction();
    }

    changeView = (activePanel: string) => {
        return () => {
            this.setState({ activePanel });
        };
    }

    onQuitOnboarding = (id: number) => {
        setLocalStorageItem("hse-app-id", String(id));
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
                    <ProfileView id="profile" />
                    <ScheduleView id="schedule" />
                    <SearchView id="search" />
                    <SettingsView id="settings" />
                </Epic>
            </ConfigProvider>
        );
    }
}

const pushStory = (
    story: Path,
    state?: LocationState
): CallHistoryMethodAction<[Path, LocationState?]> => push("/" + story, state);

const mapDispatchToProps = (
    dispatch: Dispatch<TInitialActions & TSubscriptionActions>
) => {
    return bindActionCreators(
        {
            initUserAction,
            initScheduleAction,
            getSubscriptionsAction,
            pushStory
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(App);
