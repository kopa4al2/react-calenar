import React from 'react';
import DayBlock from "./DayBlock";
import {DAYS_MAP} from "../../utils/constants/CalendarConstants";

class CalendarBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: this.props.currentMonth
        }
    }

    componentWillReceiveProps(nextProps) {

        //We changed the year or month
        if (this.props.currentMonth !== nextProps.currentMonth) {
            this.setState({currentMonth: nextProps.currentMonth})
        }
    }


    renderBlock(blockValue, blockClass, blockKey) {
        return (<DayBlock key={blockKey}
                          id={blockKey}
                          value={blockValue}
                          className={blockClass}
                          clickHandler={this.props.clickHandler}
        />)
    }

    renderHeader() {
        let row = [];
        for (let i = 0; i < 7; i++) {
            row.push(
                this.renderBlock(DAYS_MAP[i].substr(0,3), "block-heading", `h-${i}`)
            )
        }
        return row;
    }

    render() {

        return (
            <div className="calendar-body">
                {this.renderHeader()}
                {this.state.currentMonth.map((day, iterCount) => this.renderBlock(day.dayValue, day.dayClass, "d-" + iterCount))}
            </div>
        )
    }
}




export default CalendarBody;