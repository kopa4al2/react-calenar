export default {
    extractIdByDate: function (date) {
        //Basicly the id is yyyy-mm-dd
        //Example 21st october 2018 will have id=2018-10-21
        let id = date.getFullYear() +
            "-" + date.getMonth() +
            "-" + date.getDate();
        return id;
    },
    compareDates : function(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
};