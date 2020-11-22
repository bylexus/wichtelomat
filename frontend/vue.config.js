module.exports = {
    lintOnSave: false,
    transpileDependencies: ['vuetify'],
    // publicPath: process.env.NODE_ENV === 'development' ? '/dist' : '/'
    devServer: {
        port: 3000,
        proxy: {
            '^/api': {
                target: 'http://backend:3000',
            },
        },
    },
};
