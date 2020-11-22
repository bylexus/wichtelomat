module.exports = class Error400 extends Error {
    constructor(msg) {
        super(msg);
        this.code = 400;
    }
};
