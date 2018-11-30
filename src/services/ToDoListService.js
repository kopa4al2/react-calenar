import UtilFunctions from "../components/utils/UtilFunctions";
import Requester from "../repositories/AuthenticationRepository";
import MyDaysRepository from "../repositories/MyDaysRepository";
import UtilService from "./UtilService";
import ToDoListRepository from "../repositories/ToDoListRepository";

export default class ToDoListService {

    static addToDoItem(data, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        return new Promise((resolve, reject) => {
            ToDoListRepository.addToDoItem(data, headers)
                .then(
                    (success) => {
                        resolve(success)
                    },
                    (error) => {
                        reject(error);
                    })
        });
    }

    static async finishToDoItem(todoItemId, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        let item = await ToDoListRepository.getSingleToDoItem(headers, todoItemId);
        item.isFinished = true;
        return new Promise((resolve, reject) => {
           ToDoListRepository.updateToDoItem(item, headers, todoItemId)
               .then(
                   (success) => resolve(success),
                   (failure) => reject(failure)
               );
        });
    }

    static getToDoListByDayPaged(pageSize, pageNumber, user, dayId) {
        let query = `?query={"_acl.creator" : "${user.id}", "dayId" : "${dayId}"}
                            &limit=${pageSize}&skip=${pageSize * (pageNumber - 1)}
                            &sort={"_kmd.lmt": -1 , "isFinished" : 1}`;
        let headers = UtilService.generateHeaders(user.authToken);
        return ToDoListRepository.getFromToDoList(headers, query);
    }

    static getToDoListCount(user, dayId) {
        let headers = UtilService.generateHeaders(user.authToken);
        let query = `?query={"_acl.creator":"${user.id}", "dayId" : "${dayId}"}`;
        return ToDoListRepository.getToDoListCount(headers, query);

    }

    static removeToDoItem(todoId, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        return ToDoListRepository.removeToDoItem(todoId, headers);
    }



}