const nodemailer = require('nodemailer');
const config = require('../config.json');

let mailer = null;

function getMailer() {
    if (!mailer) {
        mailer = nodemailer.createTransport(config.nodemailer_transport);
    }
    return mailer;
}

/**
 * Sends an activation email. Returns a promise.
 *
 * @param {Object} userData A users data object
 */
function sendActivationEmail(userData) {
    return getMailer().sendMail({
        from: config.from_mail,
        to: userData.email,
        subject: 'Wichtelomat - Registrierung',
        text: `Hallo,

Du hast Dich auf https://wichtelomat.alexi.ch/ registriert. Das freut uns!

Um deinen Zugang zu aktivieren, öffne folgenden Link:

${config.activation_url}/${userData.activation_hash}

Viel Spass!
Dein Wichtel-König
`,
    });
}

module.exports = {
    sendActivationEmail,
};
