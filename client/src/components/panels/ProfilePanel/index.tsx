import * as React from "react";
import {
    Div,
    Cell,
    List,
    Panel,
    Group,
    Avatar,
    Button,
    PanelHeader,
    HeaderButton,
    HeaderContext,
    PanelHeaderContent,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24Users from "@vkontakte/icons/dist/24/users";
import Icon16Dropdown from "@vkontakte/icons/dist/16/dropdown";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";

import { IUser } from "@/entities/User";
import { IPost } from "@/entities/Post";
import { IProfile } from "@/entities/Profile";
import { PurePanel } from "@/utils/typings/Components";
import { Feed } from "@/components/blocks/Feed";
import { ISubscription } from "@/entities/Subscription";
import { SubscriptionCarousel } from "@/components/blocks/SubscriptionCarousel";

import "./styles.scss";

interface IProps {
    id: string;
    mode: string;
    feed: IPost[];
    currentUser: IUser;
    contextOpened: boolean;
    currentProfile: IProfile;
    subscriptionCards: ISubscription[];
    toggleContext: () => any;
    onSlideChange: (...args) => any;
    selectHeaderMode: (...args) => any;
    onUpdateElementVisibility: (elem: string, value: boolean) => any;
}

export class ProfilePanel extends PurePanel<IProps, ISubscription> {
    constructor(props) {
        super(props);

        this.onUpdateElementVisibility = this.onUpdateElementVisibility.bind(this);
    }

    onUpdateElementVisibility = (elem: string) => {
        if (elem === "modal") {
            this.props.onUpdateElementVisibility("modal", true);
        } else if (elem === "popup") {
            this.props.onUpdateElementVisibility("popup", true);
        } else {
            this.props.onUpdateElementVisibility("actionSheet", true);
        }
    }

    render() {
        const {
            id,
            feed,
            mode,
            currentUser,
            toggleContext,
            onSlideChange,
            contextOpened,
            currentProfile,
            selectHeaderMode,
            subscriptionCards
        } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    right={<HeaderButton>{<Icon24Add />}</HeaderButton>}
                >
                    <PanelHeaderContent aside={<Icon16Dropdown />} onClick={toggleContext}>
                        {currentProfile.profileName}
                    </PanelHeaderContent>
                </PanelHeader>
                <HeaderContext opened={contextOpened} onClose={toggleContext}>
                    <List>
                        <Cell
                            before={<Icon24User />}
                            asideContent={mode === "account" ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={selectHeaderMode}
                            data-mode="account"
                        >
                            {currentUser.first_name + " " + currentUser.last_name}
                        </Cell>
                        <Cell
                            before={<Icon24Users />}
                            asideContent={mode === "profile" ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={selectHeaderMode}
                            data-mode="profile"
                        >
                            {currentProfile.profileName}
                        </Cell>
                    </List>
                </HeaderContext>
                {/* <div className="profile-view__panel-header-block"></div> */}
                <img
                    style={{ width: "100%" }}
                    src="http://p.favim.com/orig/2018/09/06/header-beige-twitter-Favim.com-6254200.png"
                />
                <Group className="profile-view__main-block">
                    <Cell
                        size="l"
                        className="profile-view__cell"
                        description={currentProfile && currentProfile.profileСategory}
                        asideContent={<Avatar src={currentProfile && currentProfile.avatar_url} size={80} />}
                    >
                        {currentProfile && currentProfile.profileName}
                    </Cell>
                    <Div className="profile-view__main-buttons-wrapper">
                        <Button size="l"
                            stretched
                            level="outline"
                            style={{ marginRight: 20 }}
                        >
                            Сообщение
                            </Button>
                        <Button size="l"
                            stretched
                            before={<Icon16Add />}
                            onClick={() => this.onUpdateElementVisibility("popup")}
                        >
                            Подписаться
                            </Button>
                    </Div>
                    <Div className="profile-view__description-followers">
                        <Icon20FollowersOutline /> 865,2K подписчиков
                        </Div>
                    <Div className="profile-view__description-article">
                        <Icon20ArticleOutline /> {currentProfile && currentProfile.profileDescription}
                    </Div>
                    <Div className="profile-view__description-additional-info"
                        onClick={() => this.onUpdateElementVisibility("modal")}>
                        <Icon20Info /> Подробная информация
                        </Div>
                </Group>
                <Group className="profile-view__subscription-block">
                    <div className="profile-view__subscription-block-wrapper"
                        onClick={() => this.onUpdateElementVisibility("popup")}>
                        <div className="profile-view__subscription-block-cards">
                            <div className="profile-view__subscription-block-cards-one"></div>
                            <div className="profile-view__subscription-block-cards-two"></div>
                            <div className="profile-view__subscription-block-cards-three"></div>
                        </div>
                        <div className="profile-view__subscription-block-info">
                            <div className="profile-view__subscription-block-info-caption">С подпиской - больше!</div>
                            <div className="profile-view__subscription-block-info-text">Доступ к уникальному контенту, коммьюнити и многое другое...</div>
                        </div>
                    </div>
                </Group>

                {subscriptionCards.length !== 0 &&
                    <SubscriptionCarousel subscriptionCards={subscriptionCards} onSlideChange={onSlideChange} />
                }

                <Feed posts={feed} onUpdateVisibility={() => this.onUpdateElementVisibility("actionSheet")} />

            </Panel>
        );
    }
}

export default ProfilePanel;
