import * as React from "react";
import { format } from "date-fns";

import { Avatar, Cell, Separator, Div, Group, Button } from "@vkontakte/vkui";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";
import { IPost } from "@/entities/Post";

import "./styles.scss";

interface IProps {
    onUpdateVisibility: () => any;
}

interface IState {
    like: boolean;
}

export class Post extends React.Component<IPost & IProps, IState> {
    constructor(props) {
        super(props);

        this.showMoreActions = this.showMoreActions.bind(this);
    }

    state = {
        like: false,
    };

    private toggleLike = (): void => {
        this.setState({
            like: !this.state.like
        });
    }

    showMoreActions() {
        this.props.onUpdateVisibility();
    }

    render() {
        const { like } = this.state;
        const { name, createdAt, attachments, avatar } = this.props;

        return (
            <React.Fragment>
                <Group className="post-block">
                    <Cell size="l"
                        before={<Avatar src={avatar} />}
                        asideContent={
                            <div className="post-block__aside-content">
                                <Button level="outline" className="post-block__aside-content-button">Demo</Button>
                                <Icon24MoreHorizontal onClick={this.showMoreActions} />
                            </div>
                        }
                        bottomContent={format(new Date(createdAt), "dd MMM yyyy HH:mm:ss")}
                        className="post-block__header">
                        {name}
                    </Cell>
                    <Div className="post-block__text">{attachments.text}</Div>
                    {attachments.img && (
                        <img className={"post-block__image"}
                            src={attachments.img} />
                    )}
                    <Separator className="post-block__separator" />
                    <Cell className="post-block__iconBtn-wrapper">
                        <Div className={`iconBtn likeBtn ${like && "_active"}`}
                            onClick={this.toggleLike} />
                        <Div className={"iconBtn repliesBtn"} />
                    </Cell>
                </Group>
            </React.Fragment>
        );
    }
}
