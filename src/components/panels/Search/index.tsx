import * as React from "react";
import { Search, PanelHeader, Panel, Group, List, Cell } from "@vkontakte/vkui";
import PanelSpinner from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import { IUser } from "@/typings/User";
import { fetchUser } from "@/helpers/API";

import "./styles.scss";

const THROTTLE_DELAY: number = 100;

interface IProps {
    id: string;
    onSelectUser: () => void;
}

interface IState {
    users: IUser[];
    search: string;
    isFetching: boolean;
    timerId?: number;
}

export default class SearchPanel extends React.PureComponent<IProps, IState> {
    state = {
        users: [],
        search: "",
        isFetching: false,
        timerId: null
    };

    async componentDidMount() {
        try {
            this.setState({
                users: await fetchUser(this.state.search)
            });
        } catch (error) {
            console.log(error); // TODO: show notification
        }
    }

    get users() {
        const search = this.state.search.toLowerCase();

        return this.state.users.filter(
            ({ label }) => label.toLowerCase().indexOf(search) > -1
        );
    }

    onChange = (search: string) => {
        if (this.state.timerId) {
            clearTimeout(this.state.timerId);
        }

        // переписываем на экшены
        const timerId = window.setTimeout(
            () => this.searchUser(search),
            THROTTLE_DELAY
        );

        this.setState({
            search,
            timerId,
            isFetching: true
        });
    }

    searchUser = async (user: string) => {
        return await fetchUser(user)
            .then(users => {
                this.setState({
                    users,
                    isFetching: false
                });
            })
            .catch(error => {
                console.log(error);
            }); // TODO: show notification
    }

    render() {
        const { id, onSelectUser } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader noShadow>VK Project</PanelHeader>
                <Search
                    value={this.state.search}
                    onChange={this.onChange}
                />
                <Group title="Users">
                    {!this.state.search && (
                        <div className="name">Введите ФИО</div>
                    )}
                    {this.state.isFetching ? (
                        <PanelSpinner />
                    ) : (
                        <List>
                            {this.users.length !== 0 &&
                                this.users.map(user => {
                                    return (
                                        <Cell
                                            key={user._id}
                                            expandable
                                            onClick={onSelectUser}
                                        >
                                            {user.label}
                                        </Cell>
                                    );
                                })}
                        </List>
                    )}
                </Group>
            </Panel>
        );
    }
}
