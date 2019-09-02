import * as React from "react";
import { PureView } from "@/typings/Components";

import "@vkontakte/vkui/dist/vkui.css";
import Icon16Add from "@vkontakte/icons/dist/16/add";
import Icon20Info from "@vkontakte/icons/dist/20/info";
import Icon20ArticleOutline from "@vkontakte/icons/dist/20/article_outline";
import Icon20FollowersOutline from "@vkontakte/icons/dist/20/followers_outline";
import { Panel, PanelHeader, View, Group, Div, Button, Cell, Avatar } from "@vkontakte/vkui";

import "./styles.scss";

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
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="profile">
                    <PanelHeader noShadow={true}>Настройки</PanelHeader>
                    <Group>
                        <Cell
                            size="l"
                            style={{ display: "flex", justifyContent: "center" }}
                            description="Спорт, Интернет-СМИ"
                            photo="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
                            asideContent={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" size={80} />}
                        >
                            Sports.Ru
                        </Cell>
                        <Div style={{ display: "flex" }}>
                            <Button size="l"
                                stretched
                                level="outline"
                                style={{ marginRight: 8 }}
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
                        <Div style={{ display: "flex", paddingTop: 10, color: "gray", fontSize: 14 }}>
                            <Icon20FollowersOutline /> 865,2K подписчиков
                        </Div>
                        <Div style={{ display: "flex", paddingTop: 5, paddingBottom: 10, color: "gray", fontSize: 14 }}>
                            <Icon20ArticleOutline /> Sports.Ru - ведущий российский спортивный сайт, обладающий аудиторией более 14 млн. человек...
                        </Div>
                        <Div style={{ display: "flex", paddingTop: 5, paddingBottom: 10, fontSize: 14 }}>
                            <Icon20Info /> Подробная информация
                        </Div>
                    </Group>
                </Panel>
            </View>
        );
    }
}
