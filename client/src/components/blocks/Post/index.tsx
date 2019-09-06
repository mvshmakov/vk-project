import * as React from "react";
import { Avatar, Cell, Separator, Div, Group } from "@vkontakte/vkui";
import Icon16MoreHorizontal from "@vkontakte/icons/dist/16/more_horizontal";
import "./styles.scss";

interface IPostProps {
    name: string;
    date: string;
    img: string;
    attachments: IAttachments;
}

interface IAttachments {
    text?: string;
    video?: string; // url?
    audio?: string;
    img?: string;
}

interface IState {
    like: boolean;
}

export class Post extends React.Component<IPostProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
        };
    }

    private toggleLike = (): void => {
        const currentState = this.state.like;
        this.setState({
            like: !currentState
        });
    }

    render() {
        return (
            <React.Fragment>
                <Group className="post-block">
                    <Cell size="l"
                        before={<Avatar src={this.props.img} />}
                        asideContent={<Icon16MoreHorizontal />}
                        bottomContent={this.props.date}
                        className="post-block__header">
                        {this.props.name}
                    </Cell>
                    <Div className="post-block__text">{this.props.attachments.text}</Div>
                    {this.props.attachments.img && (
                        <Div className="post-block__image">{this.props.attachments.img}</Div>
                    )}
                    <Separator className="post-block__separator" />
                    <Cell className="post-block__iconBtn-wrapper">
                        <Div className={this.state.like ? "iconBtn likeBtn _active" : "iconBtn likeBtn"}
                            onClick={this.toggleLike} />
                        <Div className={"iconBtn repliesBtn"} />
                    </Cell>
                </Group>
            </React.Fragment>
        );
    }
}
