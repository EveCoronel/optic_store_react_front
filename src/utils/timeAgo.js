function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 2592000) { // less than 30 days
        let interval = Math.floor(diffInSeconds / 2592000);
        if (interval >= 1) {
            return interval + " month" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(diffInSeconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(diffInSeconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(diffInSeconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
        }
        return Math.floor(diffInSeconds) + " second" + (diffInSeconds > 1 ? "s" : "") + " ago";
    } else {
        return new Date(date).toLocaleDateString();
    }
}
module.exports = timeAgo;