const knexFactory = require('knex');
const config = require('../config.json');
const path = require('path');
const Error400 = require('./Error400');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const duration = require('dayjs/plugin/duration');
const { createRandomHash } = require('./tools');

dayjs.extend(duration);

let knex = null;

function getConnection() {
    if (!knex) {
        knex = knexFactory({
            client: 'sqlite3',
            connection: {
                filename: config.db_path,
            },
            migrations: {
                directory: path.resolve(__dirname, '..', 'migrations'),
            },
            useNullAsDefault: true,
        });
    }
    return knex;
}

async function getUserByEmail(email) {
    return await getConnection()
        .select('*')
        .from('users')
        .where({
            email,
        })
        .first();
}

async function registerUser(email) {
    let user = await getUserByEmail(email);
    if (user) {
        // check if the user is not yet activated:
        if (user.is_active !== true) {
            return await createActivationForUser(email);
        }
        throw new Error400('User already activated');
    } else {
        // create a new user
        return await createUser(email);
    }
}

async function createUser(email) {
    const conn = getConnection();
    await conn('users').insert({ email, is_active: false });
    return createActivationForUser(email);
}

async function createActivationForUser(email) {
    const activationHash = createRandomHash(64);
    const conn = getConnection();
    await conn('users').where({ email }).update({
        activation_hash: activationHash,
        activation_started_at: dayjs().toISOString(),
    });
    return await getUserByEmail(email);
}

async function activateUser(activationHash, password) {
    if ((password || '').length < 3) {
        throw new Error400('Passwort zu kurz');
    }

    // User nach Aktivierungs-Hash suchen:
    const conn = getConnection();
    let user = await conn('users').select('*').where({ activation_hash: activationHash }).first();
    if (!user) {
        throw new Error400('ungültige Aktivierung');
    }

    // wenn User schon aktiviert, gibts nix:
    if (user.is_active) {
        throw new Error400('ungültige Aktivierung');
    }

    // Prüfen, ob Aktivierung noch gültig ist:
    let activationStarted = dayjs(user.activation_started_at);
    let now = dayjs();
    let hoursAgo = dayjs.duration(now.diff(activationStarted)).asHours();

    if (!hoursAgo || hoursAgo > 24) {
        // invalid activation - too long ago
        throw new Error400('ungültige Aktivierung');
    }
    let hashedPW = await bcrypt.hash(password, 10);
    await conn('users').where({ id: user.id }).update({
        activation_hash: null,
        activation_started_at: dayjs().toISOString(),
        is_active: true,
        password: hashedPW,
    });
    return await getUserByEmail(user.email);
}

// ----------------------------- Anlass-Methoden ---------------------
async function getEventById(id) {
    return await getConnection()
        .select('*')
        .from('events')
        .where({
            id,
        })
        .first();
}

async function getEventsForUser(id) {
    return await getConnection()
        .select('*')
        .from('events')
        .where({
            user_id: id,
        })
        .orderBy('event_date', 'desc');
}

async function newEvent(userId) {
    let res = await getConnection()('events').insert({
        user_id: userId,
        title: 'Neuer Anlass',
    });
    if (res && res.length) {
        let id = res[0];
        let event = await getEventById(id);
        return event;
    }
}

module.exports = {
    getConnection,
    users: {
        byEmail: getUserByEmail,
        register: registerUser,
        activate: activateUser,
    },
    events: {
        new: newEvent,
        getForUser: getEventsForUser,
    },
};
