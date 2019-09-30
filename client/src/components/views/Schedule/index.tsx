import * as React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import SchedulePanel from "@/components/panels/Schedule";
import LessonDescriptionPanel from "@/components/panels/LessonDescription";
import { PureView } from "@/utils/typings/Components";
import { ILesson } from "@/entities/Lesson";

import "./styles.scss";

interface IProps {
    id: string;
    schedule: ILesson[];
}
interface IState {
    activePanel: string;
    activeLesson?: string;
}

export default class ScheduleView extends PureView<IProps, IState> {
    state = {
        activePanel: "schedule"
    };

    showLessonDescriptionPanel = (lessonId: string) => {
        this.setState({
            activePanel: "lessonDescription",
            activeLesson: lessonId
        });
    }

    showSchedulePanel = () => {
        this.setState({
            activePanel: "schedule",
            activeLesson: undefined
        });
    }

    render() {
        return (
            <View id={this.props.id} activePanel={this.state.activePanel}>
                <SchedulePanel
                    id="schedule"
                    lessons={this.props.schedule}
                    onSnippetClick={this.showLessonDescriptionPanel}
                />
                <LessonDescriptionPanel
                    id="lessonDescription"
                    onBackClick={this.showSchedulePanel}
                />
            </View>
        );
    }
}
