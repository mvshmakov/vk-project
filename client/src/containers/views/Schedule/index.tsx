import { connect } from "react-redux";

import { TStore } from "@/store";
import { ILesson } from "@/entities/Lesson";
import ScheduleView from "@/components/views/Schedule";


const groupLessonsByDay = (lessons: ILesson[]) => {
    const obj = {};

    for (const lesson of lessons) {
        if (obj[lesson.date] instanceof Array) {
            obj[lesson.date].push(lesson);
        } else {
            obj[lesson.date] = [ lesson ];
        }
    }

    return Object.values(obj);
};

const mapStateToProps = ({ account }: TStore) => {
    const { schedule = [] } = account;

    return { schedule: groupLessonsByDay(schedule) };
};

export default connect(mapStateToProps)(ScheduleView);
