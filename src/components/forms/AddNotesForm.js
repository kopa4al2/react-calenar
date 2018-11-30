import React from 'react';
import '../../component-styles/AddNoteFormStyle.css';
import Utils from '../utils/UtilFunctions';
import Loading from "../utils/util-components/Loading";
import NotesService from "../../services/NotesService";
import AuthenticationService from "../../services/AuthenticationService";

class AddNotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            isLoading: false
        }
    }

    showMessageBox(type, message) {
       this.props.openMessageBox(type, message);
    }


    emptyTextArea() {
        this.setState({note: ""});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    updateNote(evt) {
        this.setState({note: evt.target.value})
    }

    submitNote(e) {
        e.preventDefault();
        //if its empty text ignore
        if (this.state.note === "")
            return;

        let data = {};
        data.dayId = Utils.extractIdByDate(this.props.activeDate);
        data.noteContent = this.state.note;
        let emptyTextArea = this.emptyTextArea.bind(this);
        let stopLoading = this.stopLoading.bind(this);
        let openMsgBox = this.showMessageBox.bind(this);
        this.setState({isLoading: true});
        let loggedInUser;
        AuthenticationService.getCurrentUserDTO().then((user) => {
            loggedInUser = user;
            NotesService.addNote(data, loggedInUser).then((successResponse) => {
                openMsgBox("success", "Added a note");
                emptyTextArea();
                stopLoading();
            }, (failResponse) => {
                openMsgBox("error", "Could not add note");
                stopLoading();
            });
        }, (failed) => {
            openMsgBox("error", "You are not logged in");
        })

    }

    render() {
        let renderValue;
        if (this.state.isLoading) {
            renderValue = <Loading/>
        } else {
            renderValue = <div className="form-group">
                <textarea value={this.state.note} rows="3" className="form-control"
                          onChange={(evt) => this.updateNote(evt)}>
                </textarea>
            </div>
        }
        return (
            <form className="add-note-form">
                {renderValue}
                <button onClick={(e) => this.submitNote(e)} className="btn btn-primary">Add note</button>
            </form>
        )
    }
}

export default AddNotesForm;