import React, {Component} from 'react';

class NavLink extends Component {
    render() {
        return (
            <li className={this.props.isActive} onClick={() => this.props.click(this)}>
                {this.props.name}
                </li>
        )
    }
}

export default NavLink;
