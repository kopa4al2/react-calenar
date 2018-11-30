import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import '../component-styles/NotesView.css';
import Pagination from "../components/utils/util-components/Pagination";
import Loading from "../components/utils/util-components/Loading";
import Utils from "../components/utils/UtilFunctions";
import NotesService from "../services/NotesService";
import ToolTip from "../components/utils/util-components/ToolTip";
import Confirmation from "../components/utils/util-components/Confirmation";

const propTypes = {
    loggedInUser: PropTypes.object.Required /*null or undifined if not present*/,
    isLoggedIn: PropTypes.bool.Required,
    activeDate: PropTypes.instanceOf(Date).Required,
    isThisViewActive: PropTypes.bool /*this is needed only when used in a FlipCardContainer component*/
};

class  NotesController extends React.Component {

    scrollPosition = 0;

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: this.props.loggedInUser,
            isLoggedIn: this.props.isLoggedIn,
            notes: null,
            currentNotesPage: [],
            notesAnimation: "",
            modalData: {
                isOpen: false,
                idToDelete: "",
                animateClass: ""
            }
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.updateNotes(this.props.loggedInUser, this.props.activeDate)
        }
    }

    //For backend purpose
    componentWillUpdate(nextProps) {
        //For the scroll on top issue
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            this.scrollPosition = window.scrollY
        }
        if (!nextProps.isLoggedIn || !nextProps.activeDate)
            return;

        if (nextProps.isLoggedIn && !this.state.isLoggedIn) {
            this.setState({
                isLoggedIn: true,
                loggedInUser: nextProps.loggedInUser
            });
            this.updateNotes(nextProps.loggedInUser, nextProps.activeDate)
        }

        if (!this.state.isLoggedIn &&
            (nextProps.isLoggedIn && nextProps.loggedInUser)) {
            this.updateNotes(nextProps.loggedInUser, nextProps.activeDate);
        }
        //IF WE HAVE CHANGED THE DAY
        //fetch new notes
        if (!Utils.compareDates(this.props.activeDate, nextProps.activeDate)) {
            this.updateNotes(nextProps.loggedInUser, nextProps.activeDate)
        }

        //IF VIEW IS ABOUT TO BE ACTIVE
        if (nextProps.isThisViewActive && !this.props.isThisViewActive) {
            this.setState({isLoading: true});
            this.fetchNotes(nextProps.loggedInUser, nextProps.activeDate).then((notesArr) => {
                //if notes are the same return
                this.setState({isLoading: false});
                if (notesArr.equals(this.state.notes))
                    return;
                this.setState({
                    notes: notesArr
                })
            })
        }
    }

    //FOR ANIMATION PURPOSE ONLY
    componentDidUpdate() {
        //CURRENT INADEQUATE SOLUTION FOR SCROLL POSITION CHANGE ON PAGE CHANGE AND MODAL OPEN
        const element = ReactDOM.findDOMNode(this);
        if (element != null) {
            setTimeout(() => {
                window.scrollTo(0, this.scrollPosition)
            }, 1);

        }

        const animationDuration = 550;
        if (this.state.notesAnimation !== "") {
            setTimeout(() => this.setState({notesAnimation: ""}), animationDuration)
        }
    }

    //
    //DATABASE METHODS
    //

    deleteNote() {
        let id = this.state.modalData.idToDelete;
        let showMsgBoxHandler = this.showMessageBox.bind(this);
        this.setState({isLoading: true});
        NotesService.deleteNote(id, this.state.loggedInUser).then((successResponse) => {
            showMsgBoxHandler("success", "Deleted note");
            this.fetchNotes(this.props.loggedInUser, this.props.activeDate).then((notes) => this.setState({
                notes: notes,
                isLoading: false
            }));
            this.closeModal();
        }, (failResponse) => {
            showMsgBoxHandler("error", "Failed to delete note");
        });

    }

    fetchNotes(user, date) {
        if (user)
            return NotesService.getNotesForUserById(
                user.id,
                Utils.extractIdByDate(date),
                user.authToken);
    }

    updateNotes(user, date) {
        this.setState({isLoading: true});
        this.fetchNotes(user, date).then((notes) => {
            this.setState({
                notes: notes,
                isLoading: false
            })
        })
    }

    //
    //UTIL METHODS
    //

    showMessageBox(type, message) {
        this.props.openMessageBox(type, message);
    }

    openModal(id) {
        let modalState = this.state.modalData;
        modalState.isOpen = true;
        modalState.idToDelete = id;
        modalState.animateClass = "show";
        this.setState({modalData: modalState});
    }

    closeModal() {
        let modalState = this.state.modalData;
        modalState.isOpen = false;
        modalState.animateClass = "hide";
        this.setState({modalData: modalState});
    }

    //PAGINATION PAGE CHANGE
    handlePageChange(currentPage, pageDirection) {
        this.setState({
            currentNotesPage: currentPage,
            notesAnimation: pageDirection
        });
    }


    //
    //RENDER METHODS
    //

    renderNotes() {
        if (!this.state.isLoggedIn)
            return "Login to add some notes";
        if (this.state.notes !== null) {
            if (this.state.notes.length === 0) {
                return "No notes for this day yet";
            }
            else {
                let div = [];

                div.push(
                    <Pagination
                        key="pag-notes"
                        items={this.state.notes}
                        onChangePage={this.handlePageChange}
                        pageSize={5}/>
                );

                let animationDiv = [
                    <div key="note-anim-div"
                         className={"note-anim " + this.state.notesAnimation}>
                        {this.state.currentNotesPage.map((note) =>
                            <li key={note._id}>{note.noteContent}
                                <span key="dada" className="delete-note-btn tooltip-activator"
                                      onClick={() => this.openModal(note._id)}>
                                         <ToolTip tooltip={"Delete this note"}/>
                                         <a href="#">X</a>
                                </span>
                            </li>
                        )}
                    </div>];
                div.push(animationDiv);
                return div;
            }
        }
    }

    render() {
        let loading = this.state.isLoading ? <Loading/> : "";
        let confirmDialog = this.state.modalData.isOpen ?  <Confirmation
            isOpen={this.state.modalData.isOpen}
            closeFunction={() => this.closeModal()}
            confirmFunction={() => this.deleteNote()}
            confirmationMessage={"This will delete the note"}
        >
        </Confirmation>
            :
            "";
        return (
            <ul className="notes-list">
                {loading}
                {this.renderNotes()}
                {confirmDialog}
            </ul>
        )
    }
}

NotesController.propTypes = propTypes;
export default NotesController;
