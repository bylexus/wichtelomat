const crypto = require('crypto');

let emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isEmail(str) {
    return emailRe.test(str);
}

function createRandomHash(length = 64, hash = 'sha256') {
    return crypto.createHmac(hash, crypto.randomBytes(length)).digest('hex');
}

module.exports = {
    isEmail,
    createRandomHash,
};
