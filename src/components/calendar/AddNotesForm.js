import React from 'react';
import '../component-styles/AddNoteFormStyle.css';
import Utils from '../utils/UtilFunctions';
import Requester from '../../db/Requester';

class AddNotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: ""
        }
    }

    submitNote(e) {
        e.preventDefault();
        let data = {};
        let dayId = Utils.extractIdByDate(this.props.activeDate);
        data.dayId = dayId;
        data.noteContent = this.state.note;
        Requester.addNote(data).then((successResponse) => {
            //Since successResponse returns the object
            Requester.addNoteDayRelation(dayId, successResponse._id);
        },(failedResponse) => {
            console.log("Failed " + failedResponse)
        });
    }

    updateNote(evt) {
        this.setState({note: evt.target.value})
    }

    render() {
        return (
            <form className="add-note-form">
                <div className="form-group">
                <textarea rows="3" className="form-control" onChange={(evt) => this.updateNote(evt)}>
                </textarea>
                </div>
                <button onClick={(e) => this.submitNote(e)} className="btn btn-primary">Add note</button>
            </form>
        )
    }
}

export default AddNotesForm;