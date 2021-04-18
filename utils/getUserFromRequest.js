const jwt = require('jsonwebtoken');

const getUserFromRequest = (req) => {
    const token = req.headers.authorization.split(" ")[1];
    const userId = jwt.decode(token).userId;

    return userId;
};

module.exports = getUserFromRequest;
