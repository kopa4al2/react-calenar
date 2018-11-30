import BaseRepository from "./BaseRepository";

const COLLECTION_NAME = "my-days";
export default {
    addDayToMyDays(data, headers) {
        return BaseRepository.addTo("my-days", headers, data);
    },
    getDayByUser(headers, query) {
        return new Promise((resolve, reject) => {
            BaseRepository.getFrom(COLLECTION_NAME, headers, query)
                .then(
                    (success) => {
                        resolve(success);
                    }, (error) => {
                        reject(error);
                    })
        });
    },
    getDaysPaged(headers, query) {
        return new Promise((resolve, reject) => {
            BaseRepository.getFrom(COLLECTION_NAME, headers, query)
                .then(
                    (success) => resolve(success),
                    (error) => reject(error)
                )
        });
    },
    getMyDaysCount(headers, query) {
        return new Promise((resolve, reject) => {
            BaseRepository.getCount(COLLECTION_NAME, headers, query)
                .then(
                    (successResponse) => resolve(successResponse),
                    (errorResponse) => reject(errorResponse))
        });
    },
    removeDayFromMyDay(dayId, headers) {
        return new Promise((resolve, reject) => {
           BaseRepository.deleteFromById(COLLECTION_NAME, dayId, headers)
               .then(
                   (successResponse) => resolve(successResponse),
                   (errorResponse) => reject(errorResponse)
               );
        });
    }
}