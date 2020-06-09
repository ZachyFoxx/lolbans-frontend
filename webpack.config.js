const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Followed this guide:
// https://github.com/michaelbukachi/django-vuejs-tutorial/wiki/Django-Vue.js-Integration-Tutorial
//
// Get Bulma:
// https://github.com/jgthms/bulma/tree/master/css

// npm setup:
//  npm install
// Compiling:
//  Development: npm run watch
//  Production: npm run build

module.exports = {
    mode: "development",
    context: __dirname,

    entry: [
        //'@fortawesome/fontawesome-free/js/all.min.js',
        "./src/main.js"
    ],

    output: {
        path: path.resolve("./dist/"),
        filename: "app.js",
        publicPath: "/"
    },

    devServer: {
        historyApiFallback: true
    },

    plugins: [
        new BundleTracker({ filename: "./webpack-stats.json" }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new HtmlWebpackPlugin({ template: "public/index.html" }),
        new EnvironmentPlugin({
            API_ENDPOINT: "http://localhost:3000"
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: require("fibers"),
                                indentedSyntax: true // optional
                            }
                        }
                    }
                ]
            }
            /*             {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            }, */
        ]
    },

    resolve: {
        alias: {
            vue: "vue/dist/vue.js"
        },
        extensions: ["*", ".js", ".vue", ".json"]
    }
};
