import React from 'react';
import '../../component-styles/my-days/CalendarDayBody.css';
import CalendarDayBodyNavigation from "./CalendarDayBodyNavigation";
import UtilFunctions from "../utils/UtilFunctions";
import FlipCardContainer from "../calendar/main-view/FlipCardContainer";
import ToDoListController from "../../controllers/ToDoListController";
import DiaryController from "../../controllers/DiaryController";


class CalendarDayBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLinks: {
                isNotesActive: true,
                diaryActive: false,
                isTodoListActive: false
            }
        };
        this.linkChangeHandler = this.linkChangeHandler.bind(this);
    }

    linkChangeHandler(activeLinks) {
        this.setState({activeLinks: activeLinks});
    }

    renderView() {
        let view = [];
        if (this.state.activeLinks.isNotesActive) {
            view = <FlipCardContainer openMessageBox={this.props.openMessageBox}
                                      activeDate={UtilFunctions.extractDateById(this.props.currentDateId)}
            />
        } else if (this.state.activeLinks.diaryActive) {
            view = <DiaryController/>
        } else if (this.state.activeLinks.isTodoListActive) {
            view = <ToDoListController
                currentDateId={this.props.currentDateId}
                openMessageBox={this.props.openMessageBox}/>
        }
        return view;
    }

    render() {
        return (
            <div className={`calendar-day-body`}>
                <CalendarDayBodyNavigation
                    linkChangeHandler={this.linkChangeHandler}/>
                <div className="view-container">
                    {this.renderView()}
                </div>
            </div>
        )
    }
}

export default CalendarDayBody;