import * as React from "react";
import {Avatar, Cell, Separator, Div} from "@vkontakte/vkui";
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
        return(
            <React.Fragment>
                <Separator />
                <Cell size="l"
                      before={<Avatar src={this.props.img}/>}
                      bottomContent={this.props.date}>
                    {this.props.name}
                </Cell>
                <Div>{this.props.attachments.text}</Div>
                <Div>{this.props.attachments.img}</Div>
                <Separator />
                <Cell>
                    <Div className={this.state.like ? "iconBtn likeBtn _active" : "iconBtn likeBtn"}
                         onClick={this.toggleLike}/>
                    <Div className={"iconBtn repliesBtn"}/>
                </Cell>
            </React.Fragment>
        );
    }
}
