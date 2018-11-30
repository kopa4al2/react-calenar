import React from 'react';
import Loading from "../utils/util-components/Loading";
import '../../component-styles/AuthenticationFormsStyle.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AnimationUtils from "../utils/AnimationUtils";
import RegistrationService from "../../services/RegisterService";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerUsername: "",
            registerEmail: "",
            registerPassword: "",
            registerConfirmPassword: "",
            isUsernameValid: false,
            isEmailValid: false,
            isPasswordValid: false,
            isConfirmPasswordValid: false,
            warningDivClass: "text-warning",
            checkingUser: false,
            registerLoading: false,
            usernameExists: true,
            showUsernameTooltip: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.checkIfUsernameExists = this.checkIfUsernameExists.bind(this);
    }

    componentWillMount() {
        this.setState({warningDivClass: "text-warning"});
    }

    closeForm() {
        this.setState({warningDivClass: "text-warning"});
        this.props.closeModal();
    }

    checkIfUsernameExists() {
        if (!this.isUsernameValid(this.state.registerUsername))
            return;
        this.setState({checkingUser: true});
        RegistrationService.isUsernameAlreadyTaken(this.state.registerUsername)
            .then((response) => {
                if (response.usernameExists) {
                    this.setState({
                        usernameExists: true,
                        showUsernameTooltip: true
                    });
                }
                else
                    this.setState({
                        usernameExists: false,
                        showUsernameTooltip: false
                    });
                this.setState({checkingUser: false});
            })
    }

    areInputsValid() {
        return this.state.isUsernameValid && this.state.isEmailValid && this.state.isPasswordValid && this.state.isConfirmPasswordValid;
    }
    registerUser(eventFirer) {

        if (this.areInputsValid() && !this.state.usernameExists) {
            let registerUserObject = {
                username: this.state.registerUsername,
                password: this.state.registerPassword,
                email: this.state.registerEmail
            };
            this.setState({registerLoading:true});
            let closeModal = this.props.closeModal;
            RegistrationService.registerUser(registerUserObject).then((resolveResponse) => {
                this.setState({registerLoading:false});
                this.props.openMessageBox("success", "Registered successfully");
                closeModal();
            }, (rejectResponse) => {
                this.props.openMessageBox("error", "Failed to register");
            })
        }//If not valid change the little text to red color
        else {
            //Its some kind of magic
            let modal = eventFirer.target.parentNode.parentNode.parentNode;
            AnimationUtils.animateElement(modal, "shake-animate", 700);
            this.setState({warningDivClass: "text-danger"})
        }
    }

    handleInputChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        if (name.toLowerCase().includes("password"))
            value = btoa(value);
        this.setState({
            ["register" + name]: value
        });
        let isValid;
        switch (name) {
            case "Username" : {
                isValid = this.isUsernameValid(value);
                this.setState({isUsernameValid: isValid});
            }
                break;
            case "Email" : {
                isValid = this.isEmailValid(value);
                this.setState({isEmailValid: isValid});
            }
                break;
            case "Password" : {
                isValid = this.isPasswordValid(value);
                this.setState({isPasswordValid: isValid});
            }
                break;
            case "ConfirmPassword" : {
                isValid = this.isConfirmPasswordValid(value);
                this.setState({isConfirmPasswordValid: isValid});
            }
                break;
            default : break;
        }
    }

    isUsernameValid(username) {
        return username.length >= 3 && username.length <= 16;
    }

    isPasswordValid(password) {
        return atob(password).length >= 3;
    }

    isEmailValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isConfirmPasswordValid(confirmPassword) {
        return atob(this.state.registerPassword) === atob(confirmPassword);
    }

    render() {
        let usernameLoading = this.state.checkingUser ? <Loading/> : "";
        let registerLoading = this.state.registerLoading ? <Loading/> : "";
        return (
            <form method="GET" className="user-form user-register-form">
                {registerLoading}
                <div className="form-group">
                    <label htmlFor="register-username">Username:</label>
                    <div
                        className={`${this.state.warningDivClass} ${this.state.isUsernameValid ? "hide" : " "}`}>Username
                        can be between 3 and 16 letters long
                    </div>
                    <div className="position-relative">
                        <input
                            name={"Username"}
                            className="form-control"
                            id="register-username"
                            type="text"
                            placeholder="Username"
                            onChange={this.handleInputChange}
                            onBlur={this.checkIfUsernameExists}/>
                        <span className={this.state.usernameExists ? "hide" : "show"}><FontAwesomeIcon
                            icon="check-circle"/></span>
                        <span className={this.state.usernameExists ? "show" : "hide"}>
                            <span id="username-taken-tooltip" className={(this.state.showUsernameTooltip) ? "show" : "hide"}>
                            username taken
                            </span><FontAwesomeIcon
                            icon="times-circle"/></span>
                        {usernameLoading}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Email:</label>
                    <div className={`${this.state.warningDivClass} ${this.state.isEmailValid ? "hide" : " "}`}>Email
                        should
                        be "example@mailService.domain"
                    </div>
                    <div className="position-relative">
                        <input
                            name={"Email"}
                            className="form-control"
                            id="register-email"
                            type="email"
                            placeholder="Email"
                            onChange={this.handleInputChange}/>
                        <span className={this.state.isEmailValid ? "show" : "hide"}><FontAwesomeIcon
                            icon="check-circle"/></span>
                        <span className={this.state.isEmailValid ? "hide" : "show"}><FontAwesomeIcon
                            icon="times-circle"/></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password:</label>
                    <div
                        className={`${this.state.warningDivClass} ${this.state.isPasswordValid ? "hide" : " "}`}>Password
                        must be atleast 3 symbols
                    </div>
                    <div className="position-relative">
                        <input
                            name={"Password"}
                            className="form-control"
                            id="register-password"
                            type="password"
                            placeholder="password"
                            onChange={this.handleInputChange}/>
                        <span className={this.state.isPasswordValid ? "show" : "hide"}><FontAwesomeIcon
                            icon="check-circle"/></span>
                        <span className={this.state.isPasswordValid ? "hide" : "show"}><FontAwesomeIcon
                            icon="times-circle"/></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Confirm Password:</label>
                    <div
                        className={`${this.state.warningDivClass} ${this.state.isConfirmPasswordValid ? "hide" : " "}`}>Passwords
                        don't match
                    </div>
                    <div className="position-relative">
                        <input
                            name={"ConfirmPassword"}
                            className="form-control"
                            id="register-confirm-password"
                            type="password"
                            placeholder="confirm password"
                            onChange={this.handleInputChange}/>
                        <span className={this.state.isConfirmPasswordValid ? "show" : "hide"}><FontAwesomeIcon
                            icon="check-circle"/></span>
                        <span className={this.state.isConfirmPasswordValid ? "hide" : "show"}><FontAwesomeIcon
                            icon="times-circle"/></span>
                    </div>
                </div>
                <div className="form-group pl-1">
                    <button type="button" onClick={this.registerUser} className="btn btn-primary">Register</button>
                    <button type="button" onClick={() => this.closeForm()} className="btn btn-primary">Cancel
                    </button>
                </div>
            </form>
        )
    }
}

export default RegisterForm;