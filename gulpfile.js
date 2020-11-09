const run = require('gulp-run');
const { series, parallel, src, dest } = require('gulp');
const del = require('del');

function cleanFrontDist() {
    return del(['frontend/dist/**']);
}

function buildFrontend(env) {
    return function () {
        if (env === 'development') {
            return run('cd frontend && NODE_ENV=development npx vue-cli-service build --mode=development').exec();
        } else {
            return run('cd frontend && NODE_ENV=production npx vue-cli-service build --mode=production').exec();
        }
    };
}

function cleanBundleDir() {
    return del(['frontend/bundle/**']);
}

function exportServerFiles() {
    return src(['backend/**', '!backend/config.json', '!node_modules/'], {
        dot: true,
    }).pipe(dest('bundle/backend/'));
}

function buildProd() {
    return series(cleanFrontDist, buildFrontend('production'));
}

function buildDev() {
    return series(cleanFrontDist, buildFrontend('development'));
}

exports.buildProd = buildProd;
exports.buildDev = buildDev;
exports.exportServerFiles = exportServerFiles;
exports.bundle = series(cleanBundleDir, parallel(exportServerFiles, buildProd));
