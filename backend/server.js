const path = require('path');
const config = require('./config.json');
const express = require('express');
const app = express();
const routes = require('./routes');
const apiRouter = express.Router();
const session = require('express-session');
// const MemoryStore = require('memorystore')(session);
const FileStore = require('session-file-store')(session);
const db = require('./lib/db');

const port = config.port;

// Configure session
app.use(
    session({
        cookie: { maxAge: 86400000, httpOnly: true, sameSite: true },
        name: 'wichtelomat',
        store: new FileStore({
            path: path.join(__dirname, 'sessions/'),
            secret: config.session_secret,
        }),
        saveUninitialized: false,
        resave: false,
        secret: config.session_secret,
    })
);

app.disable('x-powered-by');
apiRouter.use(express.json()); // for parsing json body requests

routes.registerApiRoutes(apiRouter);
routes.registerWebRoutes(app);

app.use('/api', apiRouter);

// catch all route:
app.all('*', (req, res) => {
    res.status(404).send({ error: 'Not found', code: 404 });
});

// Standard error handler:
// if (process.env.NODE_ENV === 'production') {
app.use((err, req, res, next) => {
    let status = Number(err && err.code) || 500;
    if (status < 200 || status >= 600) {
        status = 500;
    }
    res.status(status);
    res.send({ error: String(err) });
    next(err);
});
// }

// Before we start the application, we run pending db migrations:
db.getConnection()
    .migrate.latest()
    .then(() => {
        app.listen(port, () => {
            console.log(`Wichtelomat app listening at http://localhost:${port}`);
        });
    })
    .catch((err) => console.error(err));
