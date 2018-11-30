import React from 'react';
import '../../../component-styles/CalendarStatusStyle.css';
import CalendarImage from "./CalendarImage";
import ToDoListController from "../../../controllers/ToDoListController";
import UtilFunctions from "../../utils/UtilFunctions";
import MyDaysController from "../../../controllers/MyDaysController";

class CalendarStatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animateClass: "",
            oldDate: new Date(),
            isLoading: false,
        }
    }

    componentWillUpdate(nextProp) {

        if (nextProp.activeDate !== this.props.activeDate) {
            //makes the top sheet animated, and switches blocks location

            this.setState({animateClass: "calendar-block-animate"});
            //Timeout is so floating animated calendar currentNotesPage can stay the same
            const animationDuration = 950;
            setTimeout(() => {
                this.setState({animateClass: ""});
                this.setState({oldDate: nextProp.activeDate});
            }, animationDuration);
        }
    }


    render() {
        return (
            <div className="status-container">
                {/*The upper part (the calendar image)*/}
                <div className="block-container">
                    <CalendarImage
                        currentClass={"calendar-block old-calendar-block"}
                        activeDate={this.props.activeDate}/>
                    <CalendarImage
                        currentClass={"calendar-block " + this.state.animateClass}
                        activeDate={this.state.oldDate}/>
                </div>
                {/*The lower part*/}
                <ToDoListController
                    currentDateId={UtilFunctions.extractIdByDate(this.props.activeDate)}
                    openMessageBox={this.props.openMessageBox}/>
                <MyDaysController
                    activeDate={this.props.activeDate}/>
            </div>
        )
    }
}

export default CalendarStatusBar;
