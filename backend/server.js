const config = require('./config.json');
const express = require('express');
const path = require('path');
const app = express();

const port = config.port;

console.log('Frontend files path: ', path.resolve(__dirname, config.frontend_path));
app.use('/', express.static(path.resolve(__dirname, config.frontend_path)));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
