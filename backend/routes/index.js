const register = require('./register.js');
const activate = require('./activate.js');
const sessionInfo = require('./sessionInfo.js');
const login = require('./login.js');
const logout = require('./logout.js');
const csurf = require('csurf');
const authMiddleware = require('../middlewares/auth-middleware');
const anlassHandler = require('./anlass');

const csrfMiddleware = csurf({
    cookie: false,
});

module.exports = {
    registerApiRoutes: function (router) {
        // json only api - so add json header for all requests
        router.use((req, res, next) => {
            res.contentType('application/json');
            next();
        });

        // Routes WITHOUT csrf protection:
        router.get('/sessionInfo.json', sessionInfo);

        // CSRF protected routes - Routes below check a CSRF token:
        router.use(csrfMiddleware);
        router.post('/register', register);
        router.post('/activate', activate);
        router.post('/login', login);
        router.get('/logout', logout);

        // Anlass-Routen
        router.post('/anlass', authMiddleware, anlassHandler.createAnlass);
        router.get('/anlass', authMiddleware, anlassHandler.listAll);
    },

    registerWebRoutes: function (router) {
        // Routes WITHOUT csrf protection:

        // CSRF protected routes - Routes below check a CSRF token:
        router.use(csrfMiddleware);
    },
};
