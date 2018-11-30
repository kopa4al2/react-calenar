import React from 'react';
import './util-styles/ConfirmStyle.css';
import PropTypes from 'prop-types';
import ModalBox from "./ModalBox";

const modalRoot = document.getElementById('root');
const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeFunction: PropTypes.func.isRequired,
    confirmFunction: PropTypes.func.isRequired,
    confirmationMessage: PropTypes.string.isRequired
};

class Confirmation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    close() {
        this.setState({isOpen: false});
        this.props.closeFunction();
    }

    render() {
        return (
            <ModalBox
                isOpen={this.state.isOpen}
                closeFunction={this.props.closeFunction}>
                <div className="confirmation-modal">
                    <div className="confirmation-modal-header">
                        <p>Are you sure?</p>
                        <span><a href="#" onClick={() => this.close()}>&times;</a></span>
                    </div>
                    <div className="confirmation-modal-message">{this.props.confirmationMessage}</div>
                    <div className="confirmation-modal-footer">
                        <button className="btn btn-danger"
                                onClick={() => this.props.confirmFunction()}>Yes
                        </button>
                        <button className="btn btn alert-primary" onClick={() => this.close()}>No</button>
                    </div>
                </div>
            </ModalBox>
        )
    }
}

Confirmation.propTypes = propTypes;
export default Confirmation;


