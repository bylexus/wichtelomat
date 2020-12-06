module.exports = class Error403 extends Error {
    constructor(msg = 'Zugriff verweigert') {
        super(msg);
        this.code = 403;
    }
};
