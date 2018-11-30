import $ from 'jquery';
import ApiConstants from "./ApiConstants";

export default {
    getFromById(collectionName, headers, id) {
        return $.ajax({
            method: "GET",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + collectionName + "/" + id,
            headers: headers,
        });
    },
    getFrom(collectionName, headers, query) {
        let requestQuery = query ? query : "";
        return $.ajax({
            method: "GET",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + collectionName + "/" + requestQuery,
            headers: headers,
        });
    },
    addTo(collectionName, headers, data) {
        return $.ajax({
            method: "POST",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + collectionName,
            headers: headers,
            data: data
        })
    },
    putTo(collectionName, headers, data, id) {
        return $.ajax({
            method: "PUT",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + collectionName + "/" + id,
            headers: headers,
            data: data
        })
    },
    deleteFromById(dbCollectionName, id, headers) {
        return $.ajax({
            method: "DELETE",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + dbCollectionName + "/" + id,
            headers: headers
        })
    },
    getCount(collectionName, headers, query) {
        let requestQuery = query ? query : "";
        return $.ajax({
            method: "GET",
            url: ApiConstants.API_BASE_URL + "appdata/" + ApiConstants.API_KEY + "/" + collectionName + "/_count/" + requestQuery,
            headers: headers
        })
    }
}