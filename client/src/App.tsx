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
import OnboardingView from "@/containers/views/Onboarding";
import ProfileView from "@/containers/views/Profile";
import FeedView from "@/containers/views/Feed";

import { getUsers } from "@/api/users";
import { IUser } from "@/entities/User";

import { getSubscriptionsAction, TSubscriptionActions } from "@/actions/subscription";
import { getProfilesAction, TProfileActions } from "@/actions/profiles";
import { getFeedAction, TFeedActions } from "@/actions/feed";
import { initUserAction, TInitialActions } from "@/actions/initial";

interface IProps {
    pageId: string;
    pushStory: typeof pushStory;
    getFeedAction: typeof getFeedAction;
    initUserAction: typeof initUserAction;
    getProfilesAction: typeof getProfilesAction;
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
        // const fetchUser = await fetchUser("Шмаков");
        // const schedule = await fetchSchedule("Шмаков");
        let user: IUser;

        VKConnect.subscribe(event => {
            if (event.detail.type === "VKWebAppGetUserInfoResult") {
                console.log(event);
                user = event.detail.data;
            }
        });
        VKConnect.send("VKWebAppGetUserInfo", {});

        console.log(
            format(new Date(), "'Today is a' iiii")
        );

        this.props.getProfilesAction();
        this.props.initUserAction(user);
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

const pushStory = (
    story: Path,
    state?: LocationState
): CallHistoryMethodAction<[Path, LocationState?]> => push("/" + story, state);

const mapDispatchToProps = (
    dispatch: Dispatch<TInitialActions & TSubscriptionActions & TProfileActions & TFeedActions>
) => {
    return bindActionCreators(
        {
            getFeedAction,
            initUserAction,
            getProfilesAction,
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
