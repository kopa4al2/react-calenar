import React from 'react';
import '../../component-styles/my-days/CalendarDay.css';
import CalendarDayHeader from "./CalendarDayHeader";
import CalendarDayBody from "./CalendarDayBody";
import ModalBox from "../utils/util-components/ModalBox";
import MyDaysController from "../../controllers/MyDaysController";
import UtilFunctions from "../utils/UtilFunctions";

const modalCustomStyles = {
    width: "80%",
    transform: "none",
    background: "#EEE",
    "text-shadow": "none",
    "box-shadow": "none",
    border: "3px solid black"
};

class CalendarDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStretched: false
        }
    }

    handleDayStretch() {
        this.setState({isStretched: !this.state.isStretched});
    }

    renderModal() {
        let div = [];
        if (this.state.isStretched)
            div.push(
                <ModalBox
                    customStyle={modalCustomStyles}
                    isOpen={this.state.isStretched}
                    closeFunction={() => this.handleDayStretch()}>
                    <div className={`calendar-day stretched`}>
                        <CalendarDayHeader
                            isStretched={true}
                            currentDateId={this.props.currentDateId}/>
                        <CalendarDayBody
                            openMessageBox={this.props.openMessageBox}
                            currentDateId={this.props.currentDateId}
                        />
                    </div>
                </ModalBox>
            );
        return div
    }

    render() {
        return (
            <div className="outer-wrapper">
                {this.renderModal()}
                <div className={`calendar-day`}>
                    <div onClick={() => this.handleDayStretch()}>
                        <CalendarDayHeader
                            currentDateId={this.props.currentDateId}/>
                    </div>
                    <MyDaysController
                        handleClickFunction={this.props.shouldCheckIfDaysAreChanged}
                        activeDate={UtilFunctions.extractDateById(this.props.currentDateId)}/>
                </div>
            </div>
        )
    }
}

export default CalendarDay;