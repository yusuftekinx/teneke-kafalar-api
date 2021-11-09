const timediff = require('timediff')

const timeDifferenceControl = (lastPassworddate) => {

    const now = Date.now();
    const lastPasswordDate = new Date(lastPassworddate);

    const result = timediff(lastPasswordDate,now,"YDHms");

    return result;
}

module.exports = {
    timeDifferenceControl
}