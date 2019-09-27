import * as React from "react";
import {
    View,
    List,
    Cell,
    Group,
    Panel,
    Avatar,
    PanelHeader,
    HeaderButton,
    HeaderContext,
    PanelHeaderContent,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import SettingsSnippetBlock from "@/components/blocks/SettingsSnippet";
import { PureView } from "@/utils/Components";

import "./styles.scss";
import { IUser } from "@/entities/User";
import SubscriptionConfigPanel from "@/containers/panels/SubscriptionConfig";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import Icon16Dropdown from "@vkontakte/icons/dist/16/dropdown";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Users from "@vkontakte/icons/dist/24/users";
import Icon24Settings from "@vkontakte/icons/dist/24/settings";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";

export interface IStateProps {
    user: IUser;
}
interface IProps {
    id: string;
}

interface IState {
    mode: string;
    activePanel: string;
    contextOpened: boolean;
}

export default class SettingsView extends PureView<IProps & IStateProps, IState> {
    constructor(props) {
        super(props);

        this.toggleContext = this.toggleContext.bind(this);
        this.select = this.select.bind(this);
    }

    state = {
        activePanel: "main",
        contextOpened: false,
        mode: "all"
    };

    toggleContext() {
        this.setState({ contextOpened: !this.state.contextOpened });
    }

    select(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setState({ mode });
        requestAnimationFrame(this.toggleContext);
    }

    changePanel(activePanel: string) {
        return (...args) => {
            this.setState({ activePanel });
        };
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <Panel id="main">
                    <PanelHeader
                        right={<HeaderButton>{<Icon24Add />}</HeaderButton>}
                    >
                        <PanelHeaderContent aside={<Icon16Dropdown />} onClick={this.toggleContext}>
                            Sports.Ru
                        </PanelHeaderContent>
                    </PanelHeader>
                    <HeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
                        <List>
                            <Cell
                                before={<Icon24Users />}
                                asideContent={this.state.mode === "all" ? <Icon24Done fill="var(--accent)" /> : null}
                                onClick={this.select}
                                data-mode="all"
                            >
                                Another community
                            </Cell>
                            <Cell
                                before={<Icon24Settings />}
                                asideContent={this.state.mode === "managed" ? <Icon24Done fill="var(--accent)" /> : null}
                                onClick={this.select}
                                data-mode="managed"
                            >
                                Create New Community
                            </Cell>
                        </List>
                    </HeaderContext>
                    <Group>
                        <List>
                            <SettingsSnippetBlock
                                user={this.props.user}
                                onSnippetClick={() => { }}
                            />
                        </List>
                    </Group>
                    <Group title="Настройки">
                        <List>
                            <Cell expandable onClick={this.changePanel("config")}>
                                Конфигурация подписки
                            </Cell>
                        </List>
                    </Group>
                    <Group title="Мои подписки">
                        <List>
                            <Cell
                                before={<Avatar src={"https://webengage.com/blog/wp-content/uploads/commonassets/images/user.svg"} size={56} />}
                                description="Веб-сайт"
                                asideContent={<Icon24MoreHorizontal />}
                            >
                                Команда ВКонтакте</Cell>
                            <Cell
                                before={<Avatar src={"https://image.flaticon.com/icons/svg/146/146029.svg"} size={56} />}
                                description="Музыкант"
                                asideContent={<Icon24MoreHorizontal />}
                            >
                                Robbie Williams</Cell>
                            <Cell
                                before={<Avatar src={"https://idelio.ru/admin/img/man.png"} size={56} />}
                                description="Издательский дом"
                                asideContent={<Icon24MoreHorizontal />}
                            >
                                Пост Наука</Cell>
                        </List>
                    </Group>
                </Panel>
                <SubscriptionConfigPanel id="config" onBackButtonClick={this.changePanel("main")} />
            </View>
        );
    }
}
