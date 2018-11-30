import BaseRepository from "./BaseRepository";

const COLLECTION_NAME = "todo-list";
export default {
    addToDoItem(data, headers) {
        return BaseRepository.addTo(COLLECTION_NAME, headers, data);
    },
    updateToDoItem(data, headers, id) {
      return BaseRepository.putTo(COLLECTION_NAME, headers, data, id);
    },
    getFromToDoList(headers, query) {
        return new Promise((resolve, reject) => {
            BaseRepository.getFrom(COLLECTION_NAME, headers, query)
                .then(
                    (success) => resolve(success),
                    (error) => reject(error)
                )
        });
    },
    getSingleToDoItem(headers, id) {
        return new Promise((resolve, reject) => {
            BaseRepository.getFrom(COLLECTION_NAME, headers, id)
                .then(
                    (successResponse) => resolve(successResponse),
                    (errorResponse) => reject(errorResponse)
                )
        });
    },
    getToDoListCount(headers, query) {
        return new Promise((resolve, reject) => {
            BaseRepository.getCount(COLLECTION_NAME, headers, query)
                .then(
                    (successResponse) => resolve(successResponse),
                    (errorResponse) => reject(errorResponse))
        });
    },
    removeToDoItem(todoItemId, headers) {
        return new Promise((resolve, reject) => {
            BaseRepository.deleteFromById(COLLECTION_NAME, todoItemId, headers)
                .then(
                    (successResponse) => resolve(successResponse),
                    (errorResponse) => reject(errorResponse)
                );
        });
    }
}