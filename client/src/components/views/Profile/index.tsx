import * as React from "react";
import { Panel, View, Group, Div, Button, Cell, Avatar } from "@vkontakte/vkui";
import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";

import { Post } from "@/components/blocks/Post";
import { PureView } from "@/utils/Components";
import { ISubscription } from "@/entities/Subscription";
import { PostActionSheet } from "@/components/blocks/PostActionSheet";
import { SubscriptionPopout } from "@/components/blocks/SubscriptionPopout";
import { AdditionalInfoModal } from "@/components/blocks/AdditionalInfoModal";
import { SubscriptionCarousel } from "@/components/blocks/SubscriptionCarousel";
import { IUser } from "@/entities/User";
import { Feed } from "../../blocks/Feed";
import { IPost } from "../../../entities/Post";

import "./styles.scss";

export interface IStateProps {
    feed: IPost[];
    currentUser: IUser;
    subscriptionCards: ISubscription[];
}

interface IProps {
    id: string;
    getFeedAction: (...args) => {};
}

interface IState {
    activePanel: string;
    isModalShown: boolean;
    isPopupShown: boolean;
    isActionSheetShown: boolean;
    subscriptionSlideIndex: number;
}

export default class ProfileView extends PureView<IProps & IStateProps, IState> {
    constructor(props) {
        super(props);

        this.updateModalVisibility = this.updateModalVisibility.bind(this);
        this.updateActionSheetVisibility = this.updateActionSheetVisibility.bind(this);
        this.updateSubscriptionVisibility = this.updateSubscriptionVisibility.bind(this);
    }

    state = {
        activePanel: "profile",
        isModalShown: false,
        isPopupShown: false,
        isActionSheetShown: false,
        subscriptionSlideIndex: null,
    };

    componentWillMount(): void {
        this.props.getFeedAction();
    }

    updateModalVisibility = (visible: boolean) => {
        this.setState({ isModalShown: visible });
    }

    updateActionSheetVisibility = (visible: boolean) => {
        this.setState({ isActionSheetShown: visible });
    }

    updateSubscriptionVisibility = (visible: boolean) => {
        this.setState({ isPopupShown: visible });
    }

    onSlideChange = (slideIndex: number) => {
        this.setState({ subscriptionSlideIndex: slideIndex });
    }

    render() {
        const { currentUser, subscriptionCards } = this.props;

        const {
            activePanel,
            isModalShown,
            isPopupShown,
            isActionSheetShown,
        } = this.state;

        const activePopover = () => {
            if (isPopupShown) {
                return <SubscriptionPopout onUpdateVisibility={this.updateSubscriptionVisibility} />;
            } else if (isActionSheetShown) {
                return <PostActionSheet onUpdateVisibility={this.updateActionSheetVisibility} />;
            } else {
                return null;
            }
        };

        const activeModal = (
            isModalShown ? <AdditionalInfoModal user={currentUser} onUpdateVisibility={this.updateModalVisibility} /> : null
        );

        return (
            <View header={false} id={this.props.id} activePanel={activePanel} modal={activeModal} popout={activePopover()} className="profile-view">
                <Panel id="profile">
                    <div className="profile-view__panel-header-block"></div>
                    <Group className="profile-view__main-block">
                        <Cell
                            size="l"
                            className="profile-view__cell"
                            description={currentUser && currentUser.category}
                            asideContent={<Avatar src={currentUser.avatar_url} size={80} />}
                        >
                            {currentUser && currentUser.profileName}
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
                                onClick={() => this.setState({ isPopupShown: true })}
                            >
                                Подписаться
                            </Button>
                        </Div>
                        <Div className="profile-view__description-followers">
                            <Icon20FollowersOutline /> 865,2K подписчиков
                        </Div>
                        <Div className="profile-view__description-article">
                            <Icon20ArticleOutline /> {currentUser && currentUser.profileDescription}
                        </Div>
                        <Div className="profile-view__description-additional-info"
                            onClick={() => this.setState({ isModalShown: true })}>
                            <Icon20Info /> Подробная информация
                        </Div>
                    </Group>
                    <Group className="profile-view__subscription-block">
                        <div className="profile-view__subscription-block-wrapper"
                            onClick={() => this.setState({ isPopupShown: true })}>
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
                        <SubscriptionCarousel subscriptionCards={subscriptionCards} onSlideChange={this.onSlideChange} />
                    }

                    <Feed posts={this.props.feed} onUpdateVisibility={this.updateActionSheetVisibility} />

                </Panel>
            </View>
        );
    }
}
