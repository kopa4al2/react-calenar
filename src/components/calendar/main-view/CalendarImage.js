import React from 'react';
import {MONTHS_MAP} from "../../utils/constants/CalendarConstants";

const CalendarImage = (props) => {

    function getCurrentMonth() {
        return props.activeDate.getMonth();
    }

        return (
            <div className={props.currentClass}>
                <h3>{MONTHS_MAP[getCurrentMonth()].toString().substr(0,3)}</h3>
                <p className="day-paragraph">{props.activeDate.getDate()}</p>
            </div>
        );
};

export default CalendarImage;