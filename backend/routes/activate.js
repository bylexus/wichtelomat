const Error400 = require('../lib/Error400');
const db = require('../lib/db');

module.exports = async function register(req, res, next) {
    let activationHash = req.params.activationHash || null;
    try {
        if (!activationHash) {
            throw new Error400('Invalid activation');
        }

        let user = await db.users.activate(activationHash);
        res.send(user);
    } catch (e) {
        next(e);
    }
};
