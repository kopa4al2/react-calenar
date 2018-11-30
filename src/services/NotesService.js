import NotesRepository from "../repositories/NotesRepository";
import UtilService from "./UtilService";

export default class NotesService {

    static addNote(noteData, user)  {
        let headers = UtilService.generateHeaders(user.authToken);
        return new Promise((resolve, reject) => {
            NotesRepository.addNote(noteData, headers).then((successResponse) => {
                let data = {
                    dayId: successResponse.dayId,
                    noteId: successResponse._id
                };
                resolve();
            },(failedResponse) => {
                reject(failedResponse);
                console.log(failedResponse)
            });
        });
    }

    static getNotesForUserById(userId, dateId, authToken) {
        let header =  UtilService.generateHeaders(authToken);
        return new Promise((resolve, reject) => {
            NotesRepository.getNotesForUserByDay(userId, dateId, header).then((successMessage) => {
                resolve(successMessage)
            }, (errorMessage) => {
                reject(errorMessage);
            })
        });

    }

    static deleteNote(noteId, user) {
        let headers = UtilService.generateHeaders(user.authToken);
        return new Promise((resolve, reject) => {
           NotesRepository.deleteNote(noteId, headers).then((success) => {
               resolve(success);
           },(failResp) => {
               reject(failResp)
            })
        });
    }
}