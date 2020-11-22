module.exports = async function register(req, res) {
    res.send({
        user: req.session && req.session.user ? req.session.user : null,
        csrf_token: req.csrfToken(),
    });
};
