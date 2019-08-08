import { connect } from "react-redux";

import ScheduleView from "@/components/views/Schedule";
import { ILesson } from "@/typings/Lesson";

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

const mapStateToProps = ({ initial }) => {
    const { schedule = [] } = initial;

    // critical for app, only second render survives
    // due to unresolved action INIT_SCHEDULE
    // debugger;

    return { schedule: groupLessonsByDay(schedule) };
};

export default connect(mapStateToProps)(ScheduleView);
