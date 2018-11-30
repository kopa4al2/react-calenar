class UtilService {
    static generateHeaders(authToken) {
        return {
            "Authorization": "Kinvey " + authToken
        };
    }
}
export default UtilService;