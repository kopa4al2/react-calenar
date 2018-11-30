import UtilFunctions from "../components/utils/UtilFunctions";
import Requester from "../repositories/AuthenticationRepository";
import MyDaysRepository from "../repositories/MyDaysRepository";
import UtilService from "./UtilService";

export default class MyDaysService {

    static getDayIdByDate(date, user) {
        let dateId = UtilFunctions.extractIdByDate(date);
        let headers = UtilService.generateHeaders(user.authToken);
        let query = `?query={"dayId":"${dateId}", "_acl.creator" : "${user.id}"}`;
        return new Promise((resolve, reject) => {
            MyDaysRepository.getDayByUser(headers, query)
                .then(
                    (success) => {
                        if (success.length > 0)
                            resolve(success[0]._id)
                    },
                    (errorResponse) => reject(errorResponse)
                )
        });
    }

    static saveToMyDays(date, user) {
        let dateId = UtilFunctions.extractIdByDate(date);
        let data = {
            dayId: dateId
        };
        let headers = UtilService.generateHeaders(user.authToken);
        return new Promise((resolve, reject) => {
            MyDaysRepository.addDayToMyDays(data, headers)
                .then(
                    (success) => {
                        resolve(success)
                    },
                    (error) => {
                        reject(error);
                    })
        });
    }

    static getSavedDays(date, user) {
        let dayId = UtilFunctions.extractIdByDate(date);
        let query = `?query={"dayId":"${dayId}", "_acl.creator" : "${user.id}"}`;
        let headers = UtilService.generateHeaders(user.authToken);
        return MyDaysRepository.getDayByUser(headers, query);
    }

    static getDaysPaged(pageSize, pageNumber, user) {
        let query = `?query={"_acl.creator" : "${user.id}"}&limit=${pageSize}&skip=${pageSize * (pageNumber - 1)}`;
        let headers = UtilService.generateHeaders(user.authToken);
        return MyDaysRepository.getDaysPaged(headers, query);
    }

    static getDaysCount(user) {
        let headers = UtilService.generateHeaders(user.authToken);
        let query = `?query={"_acl.creator":"${user.id}"}`;
        return MyDaysRepository.getMyDaysCount(headers, query);

    }

    static removeDaysFromMyDay(dayId, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        return MyDaysRepository.removeDayFromMyDay(dayId, headers);
    }

    static checkIfDayIsSaved(dayId, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        let query = `?query={"_acl.creator":"${user.id}", "dayId" : "${dayId}"}`;
        return new Promise((resolve, reject) => {
            MyDaysRepository.getDayByUser(headers, query).then((response) => {
                if (response.length > 0)
                    resolve(true);
                resolve(false)
            })
        });

    }

}