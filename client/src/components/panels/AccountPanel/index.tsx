import * as React from "react";
import {
    Cell,
    List,
    Panel,
    Group,
    Avatar,
    PanelHeader,
    HeaderButton,
    HeaderContext,
    PanelHeaderContent,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Icon24Add from "@vkontakte/icons/dist/24/add";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24Users from "@vkontakte/icons/dist/24/users";
import Icon16Dropdown from "@vkontakte/icons/dist/16/dropdown";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";

import { IUser } from "@/entities/User";
import { IProfile } from "@/entities/Profile";
import { PurePanel } from "@/utils/typings/Components";
import { ISubscription } from "@/entities/Subscription";
import AccountSnippetBlock from "@/components/blocks/AccountSnippet";

import "./styles.scss";

interface IProps {
    id: string;
    mode: string;
    currentUser: IUser;
    contextOpened: boolean;
    currentProfile: IProfile;
    toggleContext: () => any;
    selectHeaderMode: (...args) => any;
    onActivePanelChange: (...args) => any;
}

export class AccountPanel extends PurePanel<IProps, ISubscription> {
    constructor(props) {
        super(props);

        this.onActivePanelChange = this.onActivePanelChange.bind(this);
    }

    onActivePanelChange(panelId) {
        this.props.onActivePanelChange(panelId);
    }

    render() {
        const { id, mode, currentUser, currentProfile, contextOpened, toggleContext, selectHeaderMode } = this.props;

        return (
            <Panel id={id}>
                    <PanelHeader
                        right={<HeaderButton>{<Icon24Add />}</HeaderButton>}
                    >
                        <PanelHeaderContent aside={<Icon16Dropdown />} onClick={toggleContext}>
                            {currentUser.first_name + " " + currentUser.last_name}
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
                    <Group>
                        <List>
                            <AccountSnippetBlock
                                user={currentUser}
                                onSnippetClick={() => { }}
                            />
                        </List>
                    </Group>
                    <Group title="Настройки">
                        <List>
                            <Cell expandable onClick={() => this.onActivePanelChange("config")}>
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
        );
    }
}

export default AccountPanel;
