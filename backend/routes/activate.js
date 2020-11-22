const Error400 = require('../lib/Error400');
const db = require('../lib/db');

module.exports = async function register(req, res, next) {
    let activationHash = req.body.activationHash || null;
    let password = req.body.password || null;
    try {
        if (!activationHash) {
            throw new Error400('Invalid activation');
        }

        let user = await db.users.activate(activationHash, password);
        res.send({
            id: user.id,
            email: user.email,
        });
    } catch (e) {
        next(e);
    }
};
