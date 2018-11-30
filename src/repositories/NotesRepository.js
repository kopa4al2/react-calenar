import BaseRepository from "./BaseRepository";


export default {
    getNotesForUserByDay: function (userId, dayId, headers) {
        let query = `?query={"dayId":"${dayId}", "_acl.creator":"${userId}"}`;
        return BaseRepository.getFrom("notes", headers, query);
    },
    addNote: function (data, headers) {
        return BaseRepository.addTo("notes", headers, data)
    },
    deleteNote(noteId, headers) {
        return BaseRepository.deleteFromById("notes", noteId, headers);
    }
}