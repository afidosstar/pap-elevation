var webpack = require("webpack");
var path = require('path');

module.exports = {
    // This is the "main" file which should include all other modules
    entry: {build:'./src/appMindle/AppMindle.js',app:'./app/app.js'},
    // Where should the compiled file go?
    output: {
            // To the `dist` folder
            path: './web/dist',
            // With the filename `build.js` so it's dist/build.js
            filename: '[name].js'
        },
    module: {
            // Special compilation rules
        loaders: [
            {
                // Ask webpack to check: If this file ends with .js, then apply some transforms
                test: /\.js$/,
                // Transform it with babel
                loader: 'babel',
                // don't transform node_modules folder (which don't need to be compiled)
                exclude: [/node_modules/,/static/]
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                exclude: /static/,
                include: [
                    path.resolve(__dirname, "/node_modules/materialize-css/dist/"),
                ],
            },
            { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
            { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
            { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
            { test: /\.scss$/, loader: "style!css!sass?sourceMap"}
        ]
    },
    babel:{
        "presets": ["es2015", "stage-0"],
        "plugins": ["transform-runtime"]
    },
    plugins:[
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ])
    ],
    resolve:{
        alias:{
            'static':'./web/public',
            'vue$': 'vue/dist/vue.common.js',
            'localStorage$': 'app/localStorageV.js',
            'auth':path.resolve(__dirname, "app/auth.js"),
            '^materializejs$':path.resolve(__dirname,'web/public/js/materialize.min.js'),
        }
    }

}