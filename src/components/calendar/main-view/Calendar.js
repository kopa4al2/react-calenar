import React from 'react';
import '../../../component-styles/CalendarStyle.css';
import '../../../component-styles/responsive-styles/CalendarBodyResponsive.css'
import CalendarBody from "./CalendarBody";
import CalendarStatusBar from "./CalendarStatusBar";
import Utils from "../../utils/UtilFunctions";
import {MONTHS_MAP} from "../../utils/constants/CalendarConstants";

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        /**INFO ABOUT STATE VARIABLES
         *@params {Date}           activeDate         The date of the currently clicked day
         *@params {object}         daysInCurrentMonth The information about every day's rendering (class, value etc)
         *@params {Number}         year               The current year
         *@params {Number}         month              The current month
         *@params {Object}         animation          Animation classes for this component
         */
        this.state = {
            activeDate: new Date(),
            daysInCurrentMonth: {},
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            animation: {
                moveYear: "",
                moveMonth: ""
            }
        }
    }

    componentDidMount() {
        this.setState({
            daysInCurrentMonth: this.createCurrentMonthObject()
        });
    }

    componentDidUpdate() {
        let animation = this.state.animation;
        const animationDuration = 1000;
        if (animation.moveYear !== "") {
            setTimeout(() => {
                    animation.moveYear = "";
                    this.setState({animation: animation})
                }
                , animationDuration);
        }
        if(animation.moveMonth !== "") {
            setTimeout(() => {
                    animation.moveMonth = "";
                    this.setState({animation: animation})
                }
                , animationDuration);
        }
    }

    updateYear(number) {
        let animation = this.state.animation;
        if (number < 0) {
            //Left move
            animation.moveYear = "year-left";
        } else {
            //right move
            animation.moveYear = "year-right";
        }
        this.setState({
            year: this.state.year + number,
            currentMonth: this.createCurrentMonthObject(),
            animation: animation
        })
    }

    updateMonth(num) {
        let animation = this.state.animation;
        if (num < 0) {
            //Left move
            animation.moveMonth = "month-left";
        } else {
            //right move
            animation.moveMonth = "month-right";
        }
        let newYear = this.state.year, newMonth;
        if (this.state.month === 0 && num === (-1)) {
            newMonth = 11;
            newYear = this.state.year - 1;
        }
        else if (this.state.month === 11 && num === 1) {
            newMonth = 0;
            newYear = this.state.year + 1;
        }
        else {
            newMonth = this.state.month + num;
        }
        this.setState({month: newMonth, year: newYear});
    }

    createCurrentMonthObject() {
        let monthObject = [];
        //We subtract the dayValue of the week of the last dayValue of the current month from 6,
        // because we start from 0
        //example: Date(2018,11,1).getDay() = THU = 3 (since MON is 0)
        let daysFromNextMonth = 6 - new Date(this.state.year,
            this.state.month,
            this.getDaysInMonth() - 1).getDay();

        let daysInLastMonth = this.getDaysInMonth(this.state.month - 1);
        let currentMonthFirstDay = this.getFirstDayOfMonth();
        let startDateLastMonth = daysInLastMonth - currentMonthFirstDay;
        for (let i = startDateLastMonth + 1; i <= daysInLastMonth; i++) {
            monthObject.push({
                dayValue: i,
                dayClass: "last-month"
            });
        }
        for (let i = 1; i <= this.getDaysInMonth(); i++) {
            let realTimeNow = new Date();
            let calendarTimeNow = new Date(this.state.year, this.state.month, i);
            let dayClass = "current-month";
            if (i === realTimeNow.getDate() && this.state.month === realTimeNow.getMonth() && this.state.year === realTimeNow.getFullYear()) {
                dayClass += " today";
            }
            if (Utils.compareDates(this.state.activeDate, calendarTimeNow)) {
                dayClass += " active";
            }
            monthObject.push({
                dayValue: i,
                dayClass: dayClass
            });
        }
        for (let i = 1; i <= daysFromNextMonth; i++) {
            monthObject.push({
                dayValue: i,
                dayClass: "next-month"
            });
        }
        return monthObject;
    }

    getDaysInMonth(month) {
        //IF we dont have a month as a function parameter, we return days in the current month
        if (month != null) {
            if (month === -1)
                month = 11;
            return new Date(this.state.year, month + 1, 0).getDate();
        }
        return new Date(this.state.year, this.state.month + 1, 0).getDate();
    }

    getFirstDayOfMonth() {
        return new Date(this.state.year, this.state.month, 0).getDay();
    }

    handleDayBlockClicked(dayBlockProps) {
        //Check if its a valid dayblock
        if (dayBlockProps.id.startsWith("d-") && dayBlockProps.className.includes("current-month")) {
            let date = new Date(this.state.year, this.state.month, dayBlockProps.value);
            this.setState({activeDate: date});
        }
    }

    render() {
        return (
            <div className="calendar-container">
                {/*The left part (calendar itself)*/}
                <div className="body-container">
                    <div className="calendar-header">
                        <div className="year">
                            <button onClick={() => this.updateYear(-1)}/>
                            <p className={this.state.animation.moveYear}>{this.state.year}</p>
                            <button onClick={() => this.updateYear(1)}/>
                        </div>
                        <div className="month">
                            <button onClick={() => this.updateMonth(-1)}/>
                            <p className={this.state.animation.moveMonth}>{MONTHS_MAP[this.state.month]}</p>
                            <button onClick={() => this.updateMonth(1)}/>
                        </div>
                    </div>
                    <CalendarBody clickHandler={this.handleDayBlockClicked.bind(this)}
                                  currentMonth={this.createCurrentMonthObject()}/>
                </div>
                {/*The right part of the calendar*/}
                <CalendarStatusBar
                    openMessageBox={this.props.openMessageBox}
                    activeDate={this.state.activeDate}/>
            </div>
        )
    }
}


export default Calendar;