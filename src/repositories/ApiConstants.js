const API_BASE_URL = "https://baas.kinvey.com/";
const API_KEY = "kid_r1ynbbg6Q";
const API_SECRET = "33903aebaffd4a3b944250b832bd81f3";
const BASIC_AUTH_HEADER = {
    'Authorization': "Basic " + btoa(API_KEY + ":" + API_SECRET)
};
const MASTER_AUTH_HEADER = {
    'Authorization': "Basic " + btoa(API_KEY + ":f55dd3810f61465c98c4fec7525a6ba9")
};
module.exports = {API_BASE_URL, API_KEY, BASIC_AUTH_HEADER};