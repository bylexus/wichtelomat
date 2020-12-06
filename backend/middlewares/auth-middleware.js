const db = require('../lib/db');
const Error403 = require('../lib/Error403');

async function authMiddleware(req, res, next) {
    const userInfo = req.session.user;
    if (!userInfo) {
        return next(new Error403());
    }
    const user = await db.users.byEmail(userInfo.email);
    if (!user || !user.is_active) {
        return next(new Error403());
    }
    next();
}

module.exports = authMiddleware;
