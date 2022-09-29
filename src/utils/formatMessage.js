const moment = require("moment");

// formats messages
function formatMessage(author, authorImage,message) {
    return {
        author,
        message,
        authorImage,
        time: moment().format("h:mm a"),
    };
}

module.exports = formatMessage;
