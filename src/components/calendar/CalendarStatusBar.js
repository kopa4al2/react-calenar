import React from 'react';
import '../component-styles/CalendarStatusStyle.css';
import AddNotesForm from "./AddNotesForm";
import NotesView from "./NotesView";
import ImageBlock from "./ImageBlock";

class CalendarStatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animateClass: "",
            oldDate: new Date(),
            display: {
                isFlipped: ""
            }
        }
    }

    componentWillUpdate(prevProps) {
        //TODO: causes double call to every method from the child maybe fix?
        if (prevProps.activeDate !== this.props.activeDate) {
            //makes the top sheet animated, and switches blocks location

            this.setState({animateClass: "calendar-block-animate"});
            //Timeout is so floating animated calendar currentNotesPage can stay the same
            const animationDuration = 950;
            setTimeout(() => {
                this.setState({animateClass: ""});
                this.setState({oldDate: prevProps.activeDate})
            }, animationDuration);
        }
    }

    switchView() {
        let displayState = this.state.display;

        if (displayState.isFlipped === "") {
            displayState.isFlipped = "flipped"
        } else {
            displayState.isFlipped = ""
        }
        this.setState({display: displayState});
    }


    render() {
        return (
            <div className="status-container">
                <div className="block-container">

                    <ImageBlock
                        currentClass={"calendar-block old-calendar-block"}
                        activeDate={this.props.activeDate}/>
                    <ImageBlock
                        currentClass={"calendar-block " + this.state.animateClass}
                        activeDate={this.state.oldDate}/>

                </div>
                <div className="notes-container">
                    <button className="switch-view " onClick={() => this.switchView()}> {"Switch"} </button>
                    <div className={"view-note-container " + this.state.display.isFlipped}>
                        <div className="notes-view">
                            <NotesView notes={this.props.notes}/>
                        </div>
                        <div className="save-note back">
                            <AddNotesForm activeDate={this.props.activeDate}/>
                            <button className="btn btn-primary">Save day to my days</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CalendarStatusBar;
