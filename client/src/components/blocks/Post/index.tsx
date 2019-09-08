import * as React from "react";
import { Avatar, Cell, Separator, Div, Group } from "@vkontakte/vkui";
import Icon16MoreHorizontal from "@vkontakte/icons/dist/16/more_horizontal";
import { IPostProps } from "@/entities/Post";

import "./styles.scss";

interface IState {
    like: boolean;
}

export class Post extends React.Component<IPostProps, IState> {
    constructor(props) {
        super(props);
    }

    state = {
        like: false,
    };

    private toggleLike = (): void => {
        this.setState({
            like: !this.state.like
        });
    }

    render() {
        const { text, img } = this.props.attachments;

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
                    <Div className="post-block__text">{text}</Div>
                    {img && (
                        <Div className="post-block__image">{img}</Div>
                    )}
                    <Separator className="post-block__separator" />
                    <Cell className="post-block__iconBtn-wrapper">
                        <Div className={`iconBtn likeBtn ${this.state.like && "_active"}`}
                            onClick={this.toggleLike} />
                        <Div className={"iconBtn repliesBtn"} />
                    </Cell>
                </Group>
            </React.Fragment>
        );
    }
}
