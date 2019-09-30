import * as React from "react";
import { Div } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { ILesson } from "@/entities/Lesson";
import { IFunctionalBlock } from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    time?: {
        start: string;
        end: string;
    };
    lessonType?: string;
    lessonName?: string;
    place?: string;
    teacher?: string;
    lesson: ILesson;
    onSnippetClick?: (...args: any[]) => any;
}

const titleColorPicker = (lessonType: string) => {
    switch (lessonType) {
        case "Контрольная работа":
            return "#ec5b44";
        default:
            return "#528bcc";
    }
};

const borderColorPicker = (lessonType: string) => {
    switch (lessonType) {
        case "Контрольная работа":
            return "#ec5b44";
        case "Практическое занятие":
            return "#528bcc";
        default:
            return "#d1d1d6";
    }
};

const ScheduleSnippetBlock: IFunctionalBlock<IProps> = ({
    time = { start: "12:10", end: "13:30" },
    lessonType = "Контрольная работа",
    lessonName = "Философия",
    place = "ауд. 213, Кирпичная ул., д. 33",
    teacher = "Friedrich Wilhelm Nietzsche",
    lesson,
    onSnippetClick
}: IProps) => (
    <Div className="root" onClick={() => onSnippetClick("1")}>
        <div
            className="time-wrapper"
            style={{ borderColor: borderColorPicker(lessonType) }}
        >
            <div className="time-start">{time.start}</div>
            <div className="time-end">{time.end}</div>
        </div>
        <div className="content-wrapper">
            <div
                className="lesson-type"
                style={{ color: titleColorPicker(lessonType) }}
            >
                {lessonType.toUpperCase()}
            </div>
            <div className="lesson">{lessonName}</div>
            <div>{place}</div>
            <div className="teacher">{teacher}</div>
        </div>
    </Div>
);

export default ScheduleSnippetBlock;
