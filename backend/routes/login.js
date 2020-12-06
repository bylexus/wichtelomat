const Error403 = require('../lib/Error403');
const db = require('../lib/db');
const bcrypt = require('bcrypt');

module.exports = async function login(req, res, next) {
    let email = req.body.email || null;
    let password = req.body.password || null;
    try {
        if (!email || !password) {
            throw new Error403('Falscher Username / Passwort');
        }

        let user = await db.users.byEmail(email);
        if (!user) {
            throw new Error403('Falscher Username / Passwort');
        }

        // Check activation:
        if (!user.is_active) {
            throw new Error403('Falscher Username / Passwort');
        }

        // Check password:
        let result = await bcrypt.compare(password, user.password);
        if (result !== true) {
            throw new Error403('Falscher Username / Passwort');
        }

        // OK, setup session:
        req.session.user = {
            id: user.id,
            email: user.email,
        };

        res.send(req.session);
    } catch (e) {
        next(e);
    }
};
