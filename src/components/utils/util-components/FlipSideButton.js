import React from 'react';
import PropTypes from 'prop-types';
import '../../../component-styles/DayBlockStyle.css';

const propTypes = {
    isActive: PropTypes.bool.Required,
    switchView: PropTypes.func.Required,
    messagesArray: PropTypes.array.Required
};
class FlipSideButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
        }
    }

    componentDidMount() {
    }

    switchView() {
        this.setState({isFlipped: !this.state.isFlipped});
        this.props.switchView();
    }

    render() {
        return (

            <button
                className={`switch-view ${this.props.isActive ? " enabled" : " disabled"}`}
                onClick={() => this.switchView()}>
                {this.state.isFlipped ? this.props.messagesArray[0] : this.props.messagesArray[1]}
            </button>

        )
    }
}
FlipSideButton.propTypes = propTypes;
export default FlipSideButton;