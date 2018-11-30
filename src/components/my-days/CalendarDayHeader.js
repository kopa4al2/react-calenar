import React from 'react';
import '../../component-styles/my-days/CalendarDayHeader.css';
import UtilFunctions from "../utils/UtilFunctions";
import {MONTHS_MAP, DAYS_MAP} from "../utils/constants/CalendarConstants";

const CalendarDayHeader = (props) => {

    function getDate() {
        return UtilFunctions.extractDateById(props.currentDateId);
    }

    function getMonth() {
        return props.isStretched ?
            MONTHS_MAP[getDate().getMonth()]
            :
            MONTHS_MAP[getDate().getMonth()].toString().substr(0, 3);
    }

    function getDayOfWeek() {
        return DAYS_MAP[getDate().getDay()];
    }

    function renderDayYear() {
        let yearMonthContainer = props.isStretched ?
            <React.Fragment>
                <div className="calendar-day-month">{getMonth()}</div>
                <div className="calendar-day-year">{getDate().getFullYear()}</div>
            </React.Fragment>
            :
            <div className="calendar-day-year-month-container">
                <span className="calendar-day-month">{getMonth()}</span>
                <span className="calendar-day-year">{getDate().getFullYear()}</span>
            </div>

        return yearMonthContainer;
    }

    return (
        <div className={`calendar-header ${props.isStretched ? "stretched" : ""}`}>
            {renderDayYear()}
            <div className="calendar-day-number">{getDate().getDate()}</div>
            <div className="calendar-day-day-of-week">{getDayOfWeek()}</div>
        </div>
    );
}

export default CalendarDayHeader;