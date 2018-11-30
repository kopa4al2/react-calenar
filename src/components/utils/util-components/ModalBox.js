import React from 'react';
import './util-styles/ModalBox.css';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('root');
const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeFunction: PropTypes.func.isRequired
};

class ModalBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            animationClass: "hide",
            transitionEnded: false,
            customStyle: {}
        };
        this.modal = document.createElement('div');
        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    }

    componentWillMount() {
        if (this.props.customStyle)
            this.setState({customStyle: this.props.customStyle});
        modalRoot.appendChild(this.modal);

        if (this.props.isOpen) {
            this.setState({isShown: true});
            setTimeout(() => {
                this.setState({animationClass: "show"})
            }, 10);
        }
    }

    componentWillUnmount() {
        if (modalRoot.contains(this.modal))
            modalRoot.removeChild(this.modal);
    }

    componentWillReceiveProps(props) {
        if (props.isOpen) {
            this.setState({isShown: true});
            setTimeout(() => {
                this.setState({animationClass: "show"})
            }, 10);
        }
        else {
            this.setState({animationClass: "hide"});
            const animationDurationMs = 300;
            setTimeout(() => {
                this.setState({isShown: false});
            }, animationDurationMs);
        }
    }

    handleBackgroundClick(event) {
        if (event.target.closest('div').classList.contains("modal-box-background"))
            this.props.closeFunction();

    }

    render() {
        return ReactDOM.createPortal(
            <div
                onClick={this.handleBackgroundClick}
                className={`modal-box-background ${this.state.isShown ? "shown" : ""}`}>
                <div style={this.state.customStyle}
                     className={`modal-box-content ${this.state.animationClass}`}>
                    {this.props.children}
                </div>
            </div>
            , this.modal)
    }
}

ModalBox.propTypes = propTypes;
export default ModalBox;


