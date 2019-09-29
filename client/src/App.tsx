import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { format } from "date-fns";

import "@vkontakte/vk-connect";
import VKConnect from "@vkontakte/vkui-connect-mock";
import { ConfigProvider, Epic, Root } from "@vkontakte/vkui";
import { isWebView } from "@vkontakte/vkui/src/lib/webview";
import "@vkontakte/vkui/dist/vkui.css";

import {
    getLocalStorageItem,
    setLocalStorageItem
} from "@/helpers/localStorage";

import Tabbar from "@/components/blocks/Tabbar";
import SearchView from "@/components/views/Search";
import ProfileView from "@/containers/views/Profile";
import FeedView from "@/containers/views/Feed";
import OnboardingView from "@/components/views/Onboarding";
import { getUsers } from "@/api/users";
import { initUserAction } from "@/actions/initial";
import { getSubscriptionsAction } from "@/actions/subscription";
import { getProfilesAction } from "@/actions/profiles";
import { getFeedAction } from "@/actions/feed";

interface IProps {
    pageId: string;
    pushStory: (...args) => {};
    getFeedAction: (...args) => {};
    initUserAction: (...args) => {};
    getProfilesAction: (...args) => {};
    getSubscriptionsAction: (...args) => {};
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
        // const fetchUser = await fetchUser("Шмаков");
        // const schedule = await fetchSchedule("Шмаков");

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

        this.props.getProfilesAction();
        this.props.initUserAction(user[0]);
        this.props.getSubscriptionsAction();
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

        if (e.currentTarget.dataset.story === "feed") {
            this.props.getFeedAction();
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
                    <FeedView id="feed" />
                    <SearchView id="search" />
                    <ProfileView id="profile" />
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFeedAction,
            initUserAction,
            getProfilesAction,
            getSubscriptionsAction,
            pushStory: story => push("/" + story)
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(App);
