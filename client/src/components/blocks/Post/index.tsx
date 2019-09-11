import * as React from "react";
import { Avatar, Cell, Separator, Div, Group, ActionSheet, ActionSheetItem, platform, IOS } from "@vkontakte/vkui";
import Icon16MoreHorizontal from "@vkontakte/icons/dist/16/more_horizontal";
import { IPostProps } from "@/entities/Post";

import "./styles.scss";

interface IState {
    like: boolean;
    popout: JSX.Element;
}

const osname = platform();

export class Post extends React.Component<IPostProps, IState> {
    constructor(props) {
        super(props);

        this.showMoreActions = this.showMoreActions.bind(this);
    }

    state = {
        like: false,
        popout: null
    };

    private toggleLike = (): void => {
        this.setState({
            like: !this.state.like
        });
    }

    showMoreActions() {
        this.setState({
            popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    <ActionSheetItem autoclose>
                        По дням
                    </ActionSheetItem>
                    <ActionSheetItem autoclose>
                        По неделям
                    </ActionSheetItem>
                    <ActionSheetItem autoclose>
                        По месяцам
                    </ActionSheetItem>
                    {osname === IOS && <ActionSheetItem autoclose theme="cancel">Отменить</ActionSheetItem>}
                </ActionSheet>
        });
    }

    render() {
        const { like } = this.state;
        const { text, img, video, audio } = this.props.attachments;

        return (
            <React.Fragment>
                <Group className="post-block">
                    <Cell size="l"
                        before={<Avatar src={this.props.img} />}
                        asideContent={<Icon16MoreHorizontal onClick={this.showMoreActions}/>}
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
                        <Div className={`iconBtn likeBtn ${like && "_active"}`}
                            onClick={this.toggleLike} />
                        <Div className={"iconBtn repliesBtn"} />
                    </Cell>
                </Group>
            </React.Fragment>
        );
    }
}
