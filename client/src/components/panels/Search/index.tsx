import * as React from "react";
import { Search, PanelHeader, Panel, Group, List, Div } from "@vkontakte/vkui";
import PanelSpinner from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import UserSnippetBlock from "@/components/blocks/UserSnippet";
import { IUser } from "@/typings/User";
import { PurePanel } from "@/typings/Components";

import "./styles.scss";
import {Post} from "../../blocks/Post";

const THROTTLE_DELAY: number = 100;

export interface IActionsProps {
    searchUserAction: (...args: any[]) => any;
}
export interface IStateProps {
    users: IUser[];
    loading: boolean;
}
interface IProps {
    id: string;
    type: "group" | "general";
    onSelectUser: () => any;
}

interface IState {
    username: string;
    timerId?: number;
}

export default class SearchPanel extends PurePanel<
    IActionsProps & IStateProps & IProps,
    IState
> {
    state = {
        username: "",
        timerId: null
    };

    get users() {
        const search = this.state.username.toLowerCase();

        return this.props.users.filter(
            ({ label }) => label.toLowerCase().indexOf(search) > -1
        );
    }

    onChange = (username: string) => {
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }

        const timerId = window.setTimeout(
            this.props.searchUserAction,
            THROTTLE_DELAY,
            username
        );

        this.setState({ username, timerId });
    }

    render() {
        const { id, loading, onSelectUser } = this.props;

        const children = loading ? (
            <PanelSpinner />
        ) : (
            <List>
                {this.users.length !== 0 &&
                    this.users.map(({ id, label }) => {
                        return (
                            <UserSnippetBlock
                                key={id}
                                userId={id}
                                entity="student"
                                title={label}
                                description="Тестовое описание"
                                onClick={onSelectUser}
                            />
                        );
                    })}
            </List>
        );

        const attachment = {
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores aspernatur atque autem commodi cumque, deserunt dicta dolore doloremque eius eligendi est ex fugiat hic illo laboriosam minima obcaecati odit pariatur possimus quam qui repellat repellendus rerum sapiente tempora velit! Asperiores beatae cum ducimus enim et, fugit itaque iure minus."
        };

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>Поиск</PanelHeader>
                <Search value={this.state.username} onChange={this.onChange} />
                <Group className="group">
                    {!this.state.username && (
                        <Div className="name">
                            Введите название группы, ФИО студента или
                            преподавателя, номер аудитории
                        </Div>
                    )}
                    {this.state.username && children}
                </Group>
                    <Group>
                        <Post name={"Апостол Пётр"}
                              img={"https://pp.userapi.com/SslEXxXXambnM5qNlF_WTh6S_Y0fVDlKiDvsiQ/fd0PgTJ9Xfk.jpg"}
                              date={"12 авг 2019 г."}
                              attachments={attachment}/>
                    </Group>
            </Panel>
        );
    }
}
