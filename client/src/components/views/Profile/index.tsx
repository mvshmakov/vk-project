import * as React from "react";
import { Panel, View, Group, Div, Button, Cell, Avatar, Gallery } from "@vkontakte/vkui";
import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";

import { Post } from "@/components/blocks/Post";
import { PureView } from "@/utils/Components";
import { PostActionSheet } from "@/components/blocks/PostActionSheet";
import { SubscriptionPopout } from "@/components/blocks/SubscriptionPopout";
import { AdditionalInfoModal } from "@/components/blocks/AdditionalInfoModal";

import "./styles.scss";
import { profileMocks, postMocks } from "./__mocks__";

interface IProps {
    id: string;
}

interface IState {
    activePanel: string;
    subscriptionSlideIndex: number;
    isModalShown: boolean;
    isPopupShown: boolean;
    isActionSheetShown: boolean;
}

export default class ProfileView extends PureView<IProps, IState> {
    constructor(props) {
        super(props);

        this.updateModalVisibility = this.updateModalVisibility.bind(this);
        this.updateActionSheetVisibility = this.updateActionSheetVisibility.bind(this);
        this.updateSubscriptionVisibility = this.updateSubscriptionVisibility.bind(this);
    }

    state = {
        activePanel: "profile",
        subscriptionSlideIndex: null,
        isModalShown: false,
        isPopupShown: false,
        isActionSheetShown: false
    };

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
        const posts = [1, 2, 3];

        const subscriptionCards = [1, 2, 3];

        const { activePanel, subscriptionSlideIndex, isModalShown, isPopupShown, isActionSheetShown } = this.state;

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
            isModalShown ? <AdditionalInfoModal onUpdateVisibility={this.updateModalVisibility} /> : null
        );

        return (
            <View header={false} id={this.props.id} activePanel={activePanel} modal={activeModal} popout={activePopover()} className="profile-view">
                <Panel id="profile">
                    <div className="profile-view__panel-header-block"></div>
                    <Group className="profile-view__main-block">
                        <Cell
                            size="l"
                            className="profile-view__cell"
                            description={profileMocks.category}
                            photo="http://aras.kntu.ac.ir/wp-content/uploads/2019/05/hoodie-.png"
                            asideContent={<Avatar src="http://aras.kntu.ac.ir/wp-content/uploads/2019/05/hoodie-.png" size={80} />}
                        >
                            Sports.Ru
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
                            <Icon20ArticleOutline /> {profileMocks.description}
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
                    <Group className="profile-view__subscription-gallery">
                        <Gallery
                            slideWidth="65%"
                            align="center"
                            bullets="light"
                            slideIndex={subscriptionSlideIndex}
                            onChange={this.onSlideChange}
                            style={{ marginTop: 15, marginBottom: 15, height: 290 }}
                        >
                            {subscriptionCards.map((card, i) =>
                                <div key={i} className="profile-view__subscription-gallery-card">
                                    <div className="profile-view__subscription-gallery-text">Subscription {i + 1}</div>
                                    <Button level="outline" className="profile-view__subscription-gallery-button">Купить</Button>
                                </div>
                            )}
                        </Gallery>
                    </Group>
                    {posts.map((post, i) =>
                        <Post key={i}
                            name={postMocks.name}
                            img={postMocks.img}
                            date={postMocks.date}
                            attachments={postMocks.attachment}
                            onUpdateVisibility={this.updateActionSheetVisibility} />
                    )}
                </Panel>
            </View>
        );
    }
}
