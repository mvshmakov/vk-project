import * as React from "react";
import { Panel, View, Group, Div, Button, Cell, Avatar } from "@vkontakte/vkui";
import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";

import { Post } from "@/components/blocks/Post";
import { PureView } from "@/utils/Components";
import { MoreActionsPopover } from "@/components/popovers/MoreActionsPopover";
import { SubscriptionPopover } from "@/components/popovers/SubscriptionPopover";
import { AdditionalInfoPopover } from "@/components/popovers/AdditionalInfoPopover";

import "./styles.scss";

interface IProps {
    id: string;
}
interface IState {
    activePanel: string;
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

    render() {
        const { activePanel, isModalShown, isPopupShown, isActionSheetShown } = this.state;

        const profileMocks = {
            name: "Sports.Ru",
            category: "Спорт, Интернет-СМИ",
            description: "Sports.Ru - ведущий российский спортивный сайт, обладающий аудиторией более 14 млн. человек...",
        };

        const postMocks = {
            name: "Sports.Ru",
            date: "12 авг 2019 г.",
            img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            attachment: {
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores aspernatur" +
                    "atque autem commodi cumque, deserunt dicta dolore doloremque eius eligendi est ex fugiat hic " +
                    "illo laboriosam minima obcaecati odit pariatur possimus quam qui repellat repellendus rerum " +
                    "sapiente tempora velit! Asperiores beatae cum ducimus enim et, fugit itaque iure minus."
            }
        };

        const activePopover = (
            isPopupShown ? <SubscriptionPopover onUpdateVisibility={this.updateSubscriptionVisibility} /> : (
                isActionSheetShown ? <MoreActionsPopover onUpdateVisibility={this.updateActionSheetVisibility} /> : null
            )
        );

        const activeModal = (
            isModalShown ? <AdditionalInfoPopover onUpdateVisibility={this.updateModalVisibility} /> : null
        );

        return (
            <View header={false} id={this.props.id} activePanel={activePanel} modal={activeModal} popout={activePopover} className="profile-view">
                <Panel id="profile">
                    <div className="profile-view__panel-header-block"></div>
                    <Group className="profile-view__main-block">
                        <Cell
                            size="l"
                            className="profile-view__cell"
                            description={profileMocks.category}
                            photo="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
                            asideContent={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" size={80} />}
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
                    <Post name={postMocks.name}
                        img={postMocks.img}
                        date={postMocks.date}
                        attachments={postMocks.attachment}
                        onUpdateVisibility={this.updateActionSheetVisibility} />
                    <Post name={postMocks.name}
                        img={postMocks.img}
                        date={postMocks.date}
                        attachments={postMocks.attachment}
                        onUpdateVisibility={this.updateActionSheetVisibility} />
                    <Post name={postMocks.name}
                        img={postMocks.img}
                        date={postMocks.date}
                        attachments={postMocks.attachment}
                        onUpdateVisibility={this.updateActionSheetVisibility} />
                </Panel>
            </View>
        );
    }
}
