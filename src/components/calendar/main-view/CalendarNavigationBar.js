import React from 'react';
import '../../../component-styles/Nav.css';
import {Link} from "react-router-dom";
import {RouteToContextHOC} from "../../HOC/ContextToPropsHOC";

class CalendarNavigationBar extends React.Component {
    state = {
        activeLinks: {
            home: this.props.route.location.pathname === "/" || this.props.route.location.pathname === "/calendar" ,
            myNotes: this.props.route.location.pathname === "/my_notes",
            myDays: this.props.route.location.pathname === "/my_days"
        }
    };

    static getDerivedStateFromProps(props) {
        return {activeLinks: {
                home: props.route.location.pathname === "/" || props.route.location.pathname === "/calendar",
                myNotes: props.route.location.pathname === "/my_notes",
                myDays: props.route.location.pathname === "/my_days"
            }}
    }

    handleClick(e) {
        let activeLinks = {};
        for (let [activeLink] of Object.entries(this.state.activeLinks)) {
            activeLinks[activeLink] = activeLink.toLowerCase().includes(e.target.name.toLowerCase());
        }
        this.setState({activeLinks: activeLinks})

    }

    render() {
        return (
            <nav className={"navigation-bar"}>
                <div className={"logo-container"}>
                    <h2>Calendar</h2>
                </div>
                <div className="url-container">
                    <ul>
                        <li className={this.state.activeLinks.home ? "active" : ""}><Link
                            onClick={this.handleClick.bind(this)}
                            to={"/calendar"}
                            name={"home"}>
                            Home
                        </Link></li>
                        <li className={this.state.activeLinks.myNotes ? "active" : ""}><Link
                            onClick={this.handleClick.bind(this)}
                            to={"/my_notes"}
                            name={"myNotes"}>
                            My notes
                        </Link></li>
                        <li className={this.state.activeLinks.myDays ? "active" : ""}><Link
                            onClick={this.handleClick.bind(this)}
                            to={"/my_days"}
                            name={"myDays"}>
                            My Days
                        </Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
};
export default RouteToContextHOC(CalendarNavigationBar);
