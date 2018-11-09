import React from 'react';

class DayBlock extends React.Component {

    render() {
        return (
            <div className={`day-block ${this.props.className}`}
                 onClick={() => this.props.clickHandler(this)}>
                {this.props.value}
            </div>
        )
    }
}

export default DayBlock;