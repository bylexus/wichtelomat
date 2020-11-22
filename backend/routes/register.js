const Error400 = require('../lib/Error400');
const { isEmail } = require('../lib/tools');
const db = require('../lib/db');
const { sendActivationEmail } = require('../lib/email');

module.exports = async function register(req, res, next) {
    try {
        if (!isEmail(req.body.email)) {
            throw new Error400('Invalid email');
        }

        let user = await db.users.register(req.body.email);
        await sendActivationEmail(user);
        res.send(user);
    } catch (e) {
        next(e);
    }
};
