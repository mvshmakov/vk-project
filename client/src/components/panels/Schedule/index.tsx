import * as React from "react";
import { Panel, PanelHeader, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { ILesson } from "@/entities/Lesson";
import { PurePanel } from "@/utils/typings/Components";
import ScheduleSnippetBlock from "@/components/blocks/ScheduleSnippet";

import "./styles.scss";

interface IProps {
    id: string;
    lessons: ILesson[];
    date?: string;
    onSnippetClick?: (...args: any[]) => any;
}

export default class SchedulePanel extends PurePanel<IProps, {}> {
    render() {
        const {
            id,
            date = "Четверг, 21 марта",
            lessons,
            onSnippetClick
        } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader noShadow>Расписание</PanelHeader>
                <Group title={date}>
                    {lessons.map(lesson => (
                        <ScheduleSnippetBlock
                            lesson={lesson}
                            key={lesson[0].date_iso}
                            onSnippetClick={onSnippetClick}
                        />
                    ))}
                </Group>
            </Panel>
        );
    }
}
