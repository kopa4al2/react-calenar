import React, {Component} from "react";
import AuthenticationService from "../services/AuthenticationService";
import {AuthenticationContext} from './ContextHolder';

class AuthenticationContextProvider extends Component {

    state = {
        isLoggedIn: null,
        loggedInUser: null
    };

    componentWillMount() {
        this.handleUserChange();
    }

    handleUserChange() {
        let isLoggedIn = AuthenticationService.isLoggedIn();
        if (isLoggedIn) {
            AuthenticationService.getCurrentUserDTO().then((userDto) => this.setState({
                loggedInUser: userDto,
                isLoggedIn: true
            }));
        } else {
            this.setState({
                isLoggedIn: false,
                loggedInUser: null
            });
        }
    }

    render() {
        return (
            <AuthenticationContext.Provider
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    loggedInUser: this.state.loggedInUser,
                    handleUserChange: () => this.handleUserChange()
                }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        )
    }
}

export default AuthenticationContextProvider;
