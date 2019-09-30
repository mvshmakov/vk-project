import * as React from "react";
import { View, Panel, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { IPost } from "@/entities/Post";
import { PureView } from "@/utils/typings/Components";
import { Feed } from "@/components/blocks/Feed";
import { PostActionSheet } from "@/components/blocks/PostActionSheet";

import "./styles.scss";

export interface IStateProps {
    feed: IPost[];
}

interface IProps {
    id: string;
}

interface IState {
    activePanel: string;
    activeLesson?: string;
    isActionSheetShown: boolean;
}

export default class FeedView extends PureView<IProps & IStateProps, IState> {
    constructor(props) {
        super(props);

        this.updateActionSheetVisibility = this.updateActionSheetVisibility.bind(this);
    }

    state = {
        activePanel: "feed",
        isActionSheetShown: false,
    };

    updateActionSheetVisibility = (elem: string, visible: boolean) => {
        if (elem === "actionSheet") {
            this.setState({ isActionSheetShown: visible });
        }
    }

    render() {
        const { isActionSheetShown } = this.state;

        const activePopover = (
            isActionSheetShown ? <PostActionSheet onUpdateVisibility={this.updateActionSheetVisibility} /> : null
        );

        return (
            <View id={this.props.id} activePanel={this.state.activePanel} popout={activePopover}>
                <Panel id="feed">
                    <PanelHeader noShadow>Новостная лента</PanelHeader>
                    <Feed posts={this.props.feed} onUpdateVisibility={this.updateActionSheetVisibility} />
                </Panel>
            </View>
        );
    }
}
