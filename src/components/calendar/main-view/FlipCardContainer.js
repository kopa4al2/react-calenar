import React from 'react';
import '../../../component-styles/DayBlockStyle.css';
import NotesController from "../../../controllers/NotesController";
import AddNotesForm from "../../forms/AddNotesForm";
import Loading from "../../utils/util-components/Loading";
import {AuthenticationContext} from "../../ContextHolder";
import FlipSideButton from "../../utils/util-components/FlipSideButton";
import MyDaysController from "../../../controllers/MyDaysController";

class FlipCardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedDayId: null,
            isFlipped: false,
            isLoading: false,
            isDaySaved: false
        }
    }

    componentDidMount() {
    }

    switchView() {
        this.setState({isFlipped: !this.state.isFlipped});
    }

    render() {
        let loading = this.state.isLoading ? <Loading/> : "";
        return (
            <AuthenticationContext.Consumer>
                {(context) =>
                    <div className="notes-container">
                        {loading}
                        <FlipSideButton
                            isActive={context.isLoggedIn}
                            switchView={() => this.switchView()}
                            messagesArray={["Go back to notes", "Add notes for this day"]}
                        />
                        <div
                            className={`view-note-container
                        ${this.state.isFlipped ? "flipped" : ""}`}>
                            <div className="notes-view">
                                <NotesController
                                    isLoggedIn={context.isLoggedIn}
                                    loggedInUser={context.loggedInUser}
                                    openMessageBox={this.props.openMessageBox}
                                    activeDate={this.props.activeDate}
                                    isThisViewActive={!this.state.isFlipped}/>
                            </div>
                            <div className="save-note back">
                                <AddNotesForm
                                    openMessageBox={this.props.openMessageBox}
                                    activeDate={this.props.activeDate}/>
                            </div>
                        </div>
                    </div>
                }
            </AuthenticationContext.Consumer>
        )
    }
}

export default FlipCardContainer;