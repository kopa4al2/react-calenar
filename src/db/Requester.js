import $ from 'jquery';

const API_BASE_URL = "https://baas.kinvey.com/";
const API_KEY = "kid_r1ynbbg6Q";
const API_SECRET = "33903aebaffd4a3b944250b832bd81f3";
const BASIC_AUTH_HEADER = {
    'Authorization': "Basic " + btoa(API_KEY + ":" + API_SECRET)
};
const MASTER_AUTH_HEADER = {
    'Authorization': "Basic " + btoa(API_KEY + ":f55dd3810f61465c98c4fec7525a6ba9")
};

export default {
    login: function (data) {
        return $.ajax({
            method: "POST",
            url: API_BASE_URL + "user/" + API_KEY + "/login",
            headers: BASIC_AUTH_HEADER,
            data: data
        });
    },

    register: function (data) {
        return $.ajax({
            method: "POST",
            url: API_BASE_URL + "user/" + API_KEY,
            headers: BASIC_AUTH_HEADER,
            data: data
        });
    },

    logout: function () {
        return $.ajax({
            method: "POST",
            url: API_BASE_URL + "user/" + API_KEY + "/_logout",
            headers: BASIC_AUTH_HEADER
        });
    },

    getNotesByDay: function (dayId) {
        return $.ajax({
            method: "GET",
            url: API_BASE_URL + "appdata/" + API_KEY + `/notes/?query={"dayId":"${dayId}"}`,
            headers: MASTER_AUTH_HEADER,
        });
    },
    addNote: function(data) {
        return $.ajax({
            method: "POST",
            url: API_BASE_URL + "appdata/" + API_KEY + "/notes",
            headers: MASTER_AUTH_HEADER,
            data: data
        });
    },
    addNoteDayRelation(dayId, noteId) {
        let data = {
            dayId: dayId,
            noteId: noteId
        };
        return $.ajax({
            method: "POST",
            url: API_BASE_URL + "appdata/" + API_KEY + "/days-notes",
            headers: MASTER_AUTH_HEADER,
            data: data
        });
    },
    deleteFromById(dbCollectionName, id) {
        return $.ajax({
            method:"DELETE",
            url:API_BASE_URL + "appdata/" + API_KEY + "/" + dbCollectionName + "/" + id + "?query=",
            headers: MASTER_AUTH_HEADER
        })
    }
}

