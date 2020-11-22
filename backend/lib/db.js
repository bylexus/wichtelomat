const knexFactory = require('knex');
const config = require('../config.json');
const path = require('path');
const Error400 = require('./Error400');
const dayjs = require('dayjs');
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

async function activateUser(activationHash) {
    const conn = getConnection();
    let user = await conn('users').select('*').where({ activation_hash: activationHash }).first();
    if (!user) {
        throw new Error400('ungültige Aktivierung');
    }
    let activationStarted = dayjs(user.activation_started_at);
    let now = dayjs();
    let hoursAgo = dayjs.duration(now.diff(activationStarted)).asHours();

    if (!hoursAgo || hoursAgo > 24) {
        // invalid activation - too long ago
        throw new Error400('ungültige Aktivierung');
    }
    await conn('users').where({ id: user.id }).update({
        activation_hash: null,
        activation_started_at: dayjs().toISOString(),
        is_active: true,
    });
    return await getUserByEmail(user.email);
}

module.exports = {
    getConnection,
    users: {
        byEmail: getUserByEmail,
        register: registerUser,
        activate: activateUser,
    },
};
