import Requester from "../repositories/AuthenticationRepository";

export default class AuthenticationService {

    static loginUser(userObject) {
        let setTokenFunction = AuthenticationService.setToken;
        return new Promise(function (resolve, reject) {
            Requester.login(userObject).then((succResp) => {
                const authToken = succResp._kmd.authtoken;
                setTokenFunction(authToken);
                resolve(authToken);
            }, (failResp) => {
                reject(failResp);
            });
        })
    }

    static isLoggedIn() {
        return !!AuthenticationService.getToken();
    }

    static logout() {
        return new Promise((resolve, error) => {
            let authorizationHeader = {Authorization: "Kinvey " + AuthenticationService.getToken()};
            Requester.logout(authorizationHeader).then((success) => {
                localStorage.removeItem('user_token');
                resolve(success);
            }, (errMsg) => {
                error(errMsg);
            })
        })
    }

     static getCurrentUserDTO() {
        if(!AuthenticationService.isLoggedIn())
            return;
        return new Promise((resolve, reject) => {
            Requester.getUser(AuthenticationService.getToken()).then((succ)=> {
                let user = {};
                user.id = succ._id;
                user.authToken = succ._kmd.authtoken;
                user.authToken = AuthenticationService.getToken();
                resolve(user);
            },(err) => {
                console.error(err);
                reject(err);
            })
        });

    }

    static setToken(userToken) {
        // Saves user token to localStorage
        localStorage.setItem('user_token', userToken)
    }

    static getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('user_token')
    }

}