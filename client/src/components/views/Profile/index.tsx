import * as React from "react";
import { PureView } from "@/typings/Components";

import "@vkontakte/vkui/dist/vkui.css";
import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";
import { Panel, PanelHeader, View, Group, Div, Button, Cell, Avatar } from "@vkontakte/vkui";

import "./styles.scss";
import { Post } from "../../blocks/Post";

interface IProps {
    id: string;
}
interface IState {
    activePanel: string;
}

export default class ProfileView extends PureView<IProps, IState> {
    state = {
        activePanel: "profile"
    };

    onButtonClicked() {
        console.log("Button clicked!!!");
    }

    render() {
        const attachment = {
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores aspernatur atque autem commodi cumque, deserunt dicta dolore doloremque eius eligendi est ex fugiat hic illo laboriosam minima obcaecati odit pariatur possimus quam qui repellat repellendus rerum sapiente tempora velit! Asperiores beatae cum ducimus enim et, fugit itaque iure minus."
        };

        return (
            <View id={this.props.id} activePanel={this.state.activePanel} className="profile-view">
                <Panel id="profile">
                    <PanelHeader noShadow={true} theme="alternate" className="profile-view__panel-header-block"></PanelHeader>
                    <Group className="profile-view__main-block">
                        <Cell
                            size="l"
                            className="profile-view__cell"
                            description="Спорт, Интернет-СМИ"
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
                                onClick={this.onButtonClicked}
                            >
                                Сообщение
                            </Button>
                            <Button size="l"
                                stretched
                                before={<Icon16Add />}
                                onClick={this.onButtonClicked}
                            >
                                Подписаться
                            </Button>
                        </Div>
                        <Div className="profile-view__description-followers">
                            <Icon20FollowersOutline /> 865,2K подписчиков
                        </Div>
                        <Div className="profile-view__description-article">
                            <Icon20ArticleOutline /> Sports.Ru - ведущий российский спортивный сайт, обладающий аудиторией более 14 млн. человек...
                        </Div>
                        <Div className="profile-view__description-additional-info">
                            <Icon20Info /> Подробная информация
                        </Div>
                    </Group>
                    <Group className="profile-view__subscription-block">
                        <div className="profile-view__subscription-block-wrapper"
                             onClick={this.onButtonClicked}>
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
                    <Post name={"Sports.Ru"}
                        img={"https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"}
                        date={"12 авг 2019 г."}
                        attachments={attachment} />
                    <Post name={"Sports.Ru"}
                        img={"https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"}
                        date={"12 авг 2019 г."}
                        attachments={attachment} />
                    <Post name={"Sports.Ru"}
                        img={"https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"}
                        date={"12 авг 2019 г."}
                        attachments={attachment} />
                </Panel>
            </View>
        );
    }
}
