import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import CalendarApp from "./components/CalendarApp";
import UserNavigation from "./components/navigation/UserNavigation";
import MessageBox from "./components/utils/util-components/MessageBox";
import AuthenticationContextProvider from "./components/AuthenticationContextProvider";

//RESPONSIVE STYLES
import  './component-styles/responsive-styles/CalendarBodyResponsive.css';
import  './component-styles/responsive-styles/ToDoResponsive.css';
import './component-styles/responsive-styles/CalendarHeaderResponsive.css';
import './component-styles/responsive-styles/MyDaysResponsive.css';
import './component-styles/responsive-styles/MyDaysCalendarBlock.css';
import './components/utils/util-components/util-styles/GoodJobResponsive.css';


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageBox: {
                type: "",
                closeFunction: "",
                message: ""
            }
        };

        this.openMessageBox = this.openMessageBox.bind(this);
    }

    openMessageBox(type, message) {
        let msgBox = {
            type: type,
            message: message
        };
        this.setState({
            messageBox: msgBox
        });
    }

    resetMessageBox() {
        this.setState({messageBox: {}})
    }

    render() {
        let msgBox;
        if (this.state.messageBox.type &&
            this.state.messageBox.message) {
            msgBox = <MessageBox
                closeFunction={() => this.resetMessageBox()}
                type={this.state.messageBox.type}
                message={this.state.messageBox.message}/>;
        }
        return (
            <div className="app-container">
                {msgBox}
                <AuthenticationContextProvider>
                    <UserNavigation
                        openMessageBox={this.openMessageBox}/>

                    <BrowserRouter>
                        <CalendarApp
                            openMessageBox={this.openMessageBox}/>
                    </BrowserRouter>
                </AuthenticationContextProvider>
            </div>
        )
    }
}

export default AppContainer;
