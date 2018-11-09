import React from 'react';
import '../component-styles/NotesView.css';
import '../component-styles/modal-styles/confirmation-modal.css';
import Modal from 'react-modal';
import {confirmationModalConfig} from '../../config/ModalConfig';
import Requester from "../../db/Requester";
import Pagination from "../utils/Pagination";

Modal.setAppElement('#root');

class NotesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentNotesPage: [],
            notesAnimation: "",
            modalData: {
                isOpen: false,
                idToDelete: ""
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidUpdate() {
        const animationDuration = 550;
        if(this.state.notesAnimation !== ""){
            console.log("ABOUT TO CHANGE");
            setTimeout(() => this.setState({notesAnimation:""}), animationDuration)
        }
    }

    renderNotes() {
        if (this.props.notes)
            if (this.props.notes.length > 0) {
                let div =  [];
                div.push(<Pagination
                   items={this.props.notes}
                   onChangePage={this.handlePageChange}
                   pageSize={5}/>);
                let animationDiv = [<div className={"note-anim " + this.state.notesAnimation}>
                    {this.state.currentNotesPage.map((note) =>
                        <li key={note._id}>{note.noteContent}
                            <span onClick={() => this.openModal(note._id)}>
                            <span className="tooltip">Delete this note</span>
                            <a>X</a>
                        </span>
                        </li>
                    )}
                </div>];

                div.push(animationDiv);
                return div;
            }
            else
                return "No notes for this day"
    }

    deleteNote(id) {
        //TODO: fix error and maybe remove modal or make your custom
        // Requester.deleteFromById("notes", id);
    }

    openModal(id) {
        let modalState = this.state.modalData;
        modalState.isOpen = true;
        modalState.idToDelete = id;
        this.setState({modalData: modalState});
    }

    closeModal() {
        let modalState = this.state.modalData;
        modalState.isOpen = false;
        this.setState({modalData: modalState});
    }

    handlePageChange(currentPage, pageDirection) {
        this.setState({currentNotesPage: currentPage,
        notesAnimation:pageDirection});
    }

    render() {
        return (
            <ul className="notes-list">
                {this.renderNotes()}
                <Modal
                    style={confirmationModalConfig}
                    isOpen={this.state.modalData.isOpen}>
                    <div className="confirmation-modal">
                        <h3 className="confirmation-modal-header">
                            Are you sure?
                        </h3>
                        <p className="modal-message">This will remove this note from this day</p>
                        <div className="modal-confirmation-container">
                            <button className="btn" onClick={() => this.closeModal()}>No</button>
                            <button className="btn btn-danger"
                                    onClick={() => this.deleteNote(this.state.modalData.idToDelete)}>Yes
                            </button>
                        </div>
                    </div>
                </Modal>
            </ul>
        )
    }
}

export default NotesView;
