import React, {Component} from 'react';
import '../component-styles/Nav.css';
import NavLink from './NavLink';


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links:this.props.config.items,
            totalLinks:this.props.config.items.length,
            linksStatus:Array(this.props.config.items.length).fill("")
        };
    }

    handleLinkClick(menuLink) {
        let links = Array(this.state.totalLinks).fill("");
        links[menuLink] = "nav-link-active";
        this.setState({linksStatus:links});
    }
    render() {
        return (
            <nav className={"navigation-bar"}>
                <div className={"logo-container"}>
                    <h2>{this.props.config.heading}</h2>
                </div>
                <div className="url-container">
                    <ul>
                        {this.props.config.items.map((item, key) => <NavLink key={key}
                                                                             name={item}
                                                                             click={this.handleLinkClick.bind(this, key)}
                                                                             isActive={this.state.linksStatus[key]}/>)}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;
