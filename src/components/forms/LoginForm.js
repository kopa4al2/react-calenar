import React from 'react';
import '../../component-styles/DayBlockStyle.css';
import Loading from "../utils/util-components/Loading";
import AnimationUtils from "../utils/AnimationUtils";
import AuthenticationService from "../../services/AuthenticationService";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startLoading:false,
            loginUsername: "",
            loginPassword: ""
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginUser = this.loginUser.bind(this);

    }
    stopLoading() {
        this.setState({startLoading:false});
    }
    loginUser(e) {
        //get the modal to animate it
        let modal = e.target.parentNode.parentNode.parentNode;

        let loginUserObject = {
            username: this.state.loginUsername,
            password: this.state.loginPassword,
        };
        let closeModalFunc = this.props.closeModal;
        let stopLoading = this.stopLoading.bind(this);
        //This is so global object AppContainer knows when user changes
        let userChangeHandler = this.props.loginHandler;
        this.setState({startLoading:true});
        AuthenticationService.loginUser(loginUserObject).then((authToken) => {
            stopLoading();
            closeModalFunc();
            userChangeHandler();
            this.props.openMessageBox("success", "Logged in");
        }, (errResp) => {
            stopLoading();
            this.props.openMessageBox("error", "Wrong account or password");
            AnimationUtils.animateElement(modal, "shake-animate", 700);
        });
    }


    handleUsernameChange(event) {
        let username = event.target.value;
        this.setState({loginUsername: username})
    }

    handlePasswordChange(event) {
        let password = btoa(event.target.value);
        this.setState({loginPassword: password})
    }

    render() {
        return (
            <form className="user-form user-login-form">
                {!this.state.startLoading ? "" : <Loading/>}
                <div className="form-group">
                    <label htmlFor="login-username">Username:</label>
                    <input
                        className="form-control"
                        id="login-username"
                        type="text"
                        placeholder="username"
                        onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password:</label>
                    <input
                        className="form-control"
                        id="login-password"
                        type="password"
                        placeholder="password"
                        onChange={this.handlePasswordChange}/>
                </div>
                <div className="form-group pl-1">
                    <button type="button" onClick={this.loginUser} className="btn btn-primary">Login</button>
                    <button type="button" onClick={() => this.props.closeModal()} className="btn btn-primary">Cancel</button>
                </div>
            </form>
        )
    }
}

export default LoginForm;