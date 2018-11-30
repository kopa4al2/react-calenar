import React from 'react';
import PropTypes from 'prop-types';
import './util-styles/MessageBoxStyle.css';
import ReactDOM from "react-dom";

const propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
    message: PropTypes.string.isRequired
};
const defaultProps = {
    type: "info",
    message: "Message text",
};

const messageBoxContainer = document.getElementById('message-box-container');

class MessageBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animationClass: "hide"
        };

        this.messageBox = document.createElement('div');
    }

    componentWillMount() {
        //Self closing if success or info message
        if (this.props.type === 'success' || this.props.type === 'info') {
            setTimeout(() => {
                this.closeMessageBox()
            }, 3000);
        }

        this.handleContainerClassChange("show");
        messageBoxContainer.appendChild(this.messageBox);
        setTimeout(() => {
            this.setState({animationClass: "show"});
        }, 10);


    }

    componentWillUnmount() {
        this.handleContainerClassChange("hide")
    }

    closeMessageBox() {
        this.setState({animationClass: "hide"});
        setTimeout(() => {
            if(this.props.closeFunction)
                this.props.closeFunction();
            if (messageBoxContainer.contains(this.messageBox))
                messageBoxContainer.removeChild(this.messageBox);
        }, 1000);


    }

    handleBoxClick() {
        this.closeMessageBox();
    }

    handleContainerClassChange(change) {
        if (change.toLowerCase() === "show") {
            messageBoxContainer.classList.add("show");
            messageBoxContainer.classList.remove("hide");
        } else if (change.toLowerCase() === "hide") {
            messageBoxContainer.classList.add("hide");
            messageBoxContainer.classList.remove("show");
        }

    }

    render() {
        return ReactDOM.createPortal(
            <div
                onClick={() => this.handleBoxClick()}
                className={"message-box-content "
                + this.props.type + "  "
                + this.state.animationClass}>
                <div
                    className="message-box-message">
                    <span
                        className="message-type">{this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1) + ": "}</span>
                    {this.props.message}
                </div>
            </div>
            , this.messageBox)
    }
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;
