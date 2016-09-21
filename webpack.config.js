"use strict";

const merge     = require("webpack-merge");
const path      = require("path");
const webpack   = require("webpack");

const PATHS = {
    src: path.join(__dirname, "src"),
    bundles: path.join(__dirname, "dist"),
    publicPath: "/assets/"
};

const common = {
    entry: {
        "app": [
            path.join(PATHS.src, "index.ts")
        ],
    },
    output: {
        path: PATHS.bundles,
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        publicPath: PATHS.publicPath
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint",
                include: PATHS.src
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader"]
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};

const TARGET = process.env.npm_lifecycle_event;
let config;

/* dev settings */
if (TARGET === "start" || !TARGET) {
    config = merge(common, {
        devtool: "eval-source-map",
        devServer: {
            publicPath: PATHS.publicPath,
            progress: true,
            stats: "error-only"
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": "\"development\""
            })
        ]
    });
}

/* prod settings */
else if (TARGET === "build") {
    config = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": "\"production\""
            })
        ]
    });
}

module.exports = config;
