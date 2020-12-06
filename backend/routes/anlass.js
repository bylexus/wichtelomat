const Error403 = require('../lib/Error403');
const db = require('../lib/db');

async function createAnlass(req, res, next) {
    const user = req.session.user;
    try {
        let event = await db.events.new(user.id);
        res.send({ anlass: event });
    } catch (e) {
        next(e);
    }
}

async function listAll(req, res, next) {
    const user = req.session.user;
    try {
        let events = await db.events.getForUser(user.id);
        res.send({ anlaesse: events });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createAnlass,
    listAll,
};
