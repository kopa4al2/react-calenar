import React from 'react';
import {MONTHS_MAP} from "../utils/constants/CalendarConstants";

class ImageBlock extends React.Component {

    getCurrentMonth() {
        return this.props.activeDate.getMonth();
    }

    render() {
        return (
            <div className={this.props.currentClass}>
                <h3>{MONTHS_MAP[this.getCurrentMonth()].toString().substr(0,3)}</h3>
                <p className="day-paragraph">{this.props.activeDate.getDate()}</p>
            </div>
        )
    }
}

export default ImageBlock;