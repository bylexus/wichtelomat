module.exports = async function logout(req, res, next) {
    try {
        req.session.regenerate(() => {
            res.send({
                csrf_token: req.csrfToken(),
            });
        });
    } catch (e) {
        next(e);
    }
};
