import AuthenticationRepository from "../repositories/AuthenticationRepository";

export default class RegisterService {

    static isUsernameAlreadyTaken(username) {
        let data = {username: username};
        return new Promise((resolve, reject) => {
            AuthenticationRepository.checkIfUsernameExists(data).then((successResponse) => {
                resolve(successResponse);
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    static registerUser(userObject) {
        return new Promise((resolve, reject) => {
            AuthenticationRepository.register(userObject).then((successResponse) => {
                resolve(successResponse);
            }, (errorResponse) => {
                reject(errorResponse);
            })
        })
    }
}