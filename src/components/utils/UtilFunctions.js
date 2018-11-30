export default {
    extractIdByDate: function (date) {
        //Basicly the id is yyyy-mm-dd
        //Example 21st october 2018 will have id=2018-10-21
        let id = date.getFullYear() +
            "-" + date.getMonth() +
            "-" + date.getDate();
        return id;
    },
    extractDateById: function (id) {
        let year = id.split("-")[0];
        let month = id.split("-")[1];
        let day = id.split("-")[2];
        return new Date(year, month, day, 0, 0, 0);
    },
    compareDates: function (date1, date2) {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    },
    areUsersDtoSame: function (user1, user2) {
        if (!user1 || !user2)
            return false;
        return user1.id === user2.id && user1.authToken === user2.authToken;
    },
    elementInViewport: function (el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }
};