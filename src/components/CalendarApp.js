import React, {Component} from 'react';
import NavigationBar from "./navigation/NavigationBar";
import config from "../config/NavBarConfig";
import Calendar from "./calendar/Calendar";
import './component-styles/App.css';
class CalendarApp extends Component {
    render() {
        return (
            <div className="app-container">
                <NavigationBar config={config}/>
                <Calendar/>

            </div>
        )
    }
}

export default CalendarApp;
