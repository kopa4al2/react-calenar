import $ from 'jquery';
import ApiConstants from "./ApiConstants";
export default {
    login: function (data) {
        return $.ajax({
            method: "POST",
            url: ApiConstants.API_BASE_URL + "user/" + ApiConstants.API_KEY + "/login",
            headers: ApiConstants.BASIC_AUTH_HEADER,
            data: data
        });
    },

    register: function (data) {
        return $.ajax({
            method: "POST",
            url: ApiConstants.API_BASE_URL + "user/" + ApiConstants.API_KEY,
            headers: ApiConstants.BASIC_AUTH_HEADER,
            data: data
        });
    },

    logout: function (headers) {
        return $.ajax({
            method: "POST",
            url: ApiConstants.API_BASE_URL + "user/" + ApiConstants.API_KEY + "/_logout",
            headers: headers
        });
    },

    checkIfUsernameExists: function(data) {
        return $.ajax({
            method: "POST",
            url:`${ApiConstants.API_BASE_URL}rpc/${ApiConstants.API_KEY}/check-username-exists`,
            headers:ApiConstants.BASIC_AUTH_HEADER,
            data:data
        });
    },

    getUser(authToken) {
        let headers = {"Authorization": "Kinvey " + authToken};
        return $.ajax({
            method:"GET",
            url: ApiConstants.API_BASE_URL + "user/" + ApiConstants.API_KEY + "/_me",
            headers: headers
        })
    }

}

