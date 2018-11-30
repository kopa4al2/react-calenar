import React, {Component} from 'react';
import CalendarNavigationBar from "./calendar/main-view/CalendarNavigationBar";
import Calendar from "./calendar/main-view/Calendar";
import '../component-styles/App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleDoubleUp, faCheck, faCheckCircle, faTimes, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Route} from "react-router-dom";
import NotesController from "../controllers/NotesController";
import MyDaysContainer from "./my-days/MyDaysContainer";
import {AuthenticationContext} from "./ContextHolder";

library.add(faCheck, faTimes, faCheckCircle, faTimesCircle, faAngleDoubleUp);

class CalendarApp extends Component {

    componentWillMount() {
        this.bindCustomArrayEqualsMethod();
    }

    bindCustomArrayEqualsMethod() {
        Array.prototype.equals = function (array) {
            // if the other array is a falsy value, return
            if (!array) {
                return false;
            }


            // compare lengths - can save a lot of time
            if (this.length !== array.length) {
                return false;
            }


            for (var i = 0, l = this.length; i < l; i++) {
                // Check if we have nested arrays
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    // recurse into the nested arrays
                    if (!this[i].equals(array[i])) {

                        return false;
                    }
                }
                else if (this[i] === array[i]) {
                    // Warning - two different object instances will never be equal: {x:20} != {x:20}
                    return false;
                }
            }
            return true;
        };
        // Hide method from for-in loops
        Object.defineProperty(Array.prototype, "equals", {enumerable: false});
    }

    render() {
        return (
            <div className="calendar-app-container">

                <AuthenticationContext.Consumer>
                    {(context) =>
                        <CalendarNavigationBar
                            isLoggedIn={context.isLoggedIn}/>
                    }
                </AuthenticationContext.Consumer>
                {/*THIS IS FOR GITHUB DEPLOY ONLY*/}
                {/*<Route exact path={"/react-deploy"}*/}
                       {/*render={(props) =>*/}
                           {/*<Calendar*/}
                               {/*openMessageBox={this.props.openMessageBox}/>*/}
                       {/*}*/}
                {/*/>*/}
                <Route exact path={"/"}
                       render={(props) =>
                           <Calendar
                               openMessageBox={this.props.openMessageBox}/>
                       }
                />
                <Route path={"/calendar"}
                       render={(props) =>
                           <Calendar
                               openMessageBox={this.props.openMessageBox}/>
                       }
                />
                <Route
                    exact path={"/my_notes"}
                    render={(props) =>
                        <AuthenticationContext.Consumer>
                            {(context) =>
                                <NotesController
                                    openMessageBox={this.props.openMessageBox}
                                    loggedInUser={context.loggedInUser}
                                    isLoggedIn={context.isLoggedIn}
                                    activeDate={new Date()}/>}
                        </AuthenticationContext.Consumer>
                    }/>
                <Route
                    exact path={"/my_days"}
                    render={(props) =>
                        <AuthenticationContext.Consumer>
                            {(context) =>
                                <MyDaysContainer
                                    isLoggedIn={context.isLoggedIn}
                                    currentUser={context.loggedInUser}
                                    openMessageBox={this.props.openMessageBox}/>
                            }
                        </AuthenticationContext.Consumer>
                    }
                />


            </div>
        )
    }
}

export default CalendarApp;
