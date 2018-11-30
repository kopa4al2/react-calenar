import React, {Component} from 'react';
import '../../component-styles/UserNavigation.css';
import ModalBox from ".././utils/util-components/ModalBox";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import {AuthenticationContext} from '../ContextHolder';
import AuthenticationService from "../../services/AuthenticationService";

class UserNavigation extends Component {
    contextNotifier;
    constructor(props) {
        super(props);
        this.state = {
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            mouseOver: false
        }
    }

    componentWillMount() {

        this.setState({isLoggedIn: this.props.isLoggedIn});
    }

    componentWillUpdate(nextProps) {
        if (this.state.isLoggedIn !== nextProps.isLoggedIn)
            this.setState({isLoggedIn: nextProps.isLoggedIn})

    }

    closeModal(modalToClose) {
        switch (modalToClose.toLowerCase()) {
            case "login" : {
                if (this.state.isLoginModalOpen)
                    this.setState({isLoginModalOpen: false})
            }
                break;
            case "register" : {
                if (this.state.isRegisterModalOpen)
                    this.setState({isRegisterModalOpen: false})
            }
                break;
        }
    }

    openModal(modalToClose) {
        switch (modalToClose.toLowerCase()) {
            case "login" : {
                if (!this.state.isLoginModalOpen)
                    this.setState({isLoginModalOpen: true})
            }
                break;
            case "register" : {
                if (!this.state.isRegisterModalOpen)
                    this.setState({isRegisterModalOpen: true})
            }
                break;
        }
    }

    logout() {
        AuthenticationService.logout().then(() => {
            this.props.openMessageBox("success", "Logged out");
            //This is a function passed through Context.Consumer in render method
            this.contextNotifier();
        });
    }


    handleMouseOver() {
        this.setState({mouseOver: true});
    }

    handleMouseLeave() {
        this.setState({mouseOver: false});
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {(context) => (
                    <div
                        onMouseEnter={() => this.handleMouseOver()}
                        onMouseLeave={() => this.handleMouseLeave()}
                        className={`user-navigation-container ${this.state.mouseOver ? "show" : "hide"}`}>
                        {this.contextNotifier = context.handleUserChange}

                        < ul className="user-nav">
                            <li className={`user-nav-link ${!context.isLoggedIn ? "" : "hidden"}`}>
                                <a href="#" onClick={() => this.openModal('login')}>
                                    Login
                                </a>
                            </li>
                            <li className={`user-nav-link ${!context.isLoggedIn ? "" : "hidden"}`}>
                                <a onClick={() => this.openModal('register')} href="#">
                                    Register</a>
                            </li>
                            <li className={`user-nav-link ${!context.isLoggedIn ? "hidden" : ""}`}>
                                <a onClick={() => this.logout()} href="#">
                                    Logout
                                </a>
                            </li>
                        </ul>

                        {/*REGISTER MODAL*/}
                        <ModalBox
                            customStyle={{"marginTop": 0, "width": "40%"}}
                            isOpen={this.state.isRegisterModalOpen}
                            closeFunction={() => this.closeModal('register')}>
                            <RegisterForm
                                openMessageBox={this.props.openMessageBox}
                                closeModal={() => this.closeModal('register')}/>
                        </ModalBox>
                        {/*LOGIN MODAL*/}
                        <ModalBox
                            customStyle={{"marginTop": "5%"}}
                            isOpen={this.state.isLoginModalOpen}
                            closeFunction={() => this.closeModal('Login')}>
                            <LoginForm
                                openMessageBox={this.props.openMessageBox}
                                loginHandler={this.contextNotifier}
                                closeModal={() => this.closeModal('login')}/>
                        </ModalBox>
                    </div>
                )}
            </AuthenticationContext.Consumer>
        )
    }
}

export default UserNavigation;
