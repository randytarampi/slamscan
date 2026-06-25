import path from "path";
import {fileURLToPath} from "url";
import slsw from "serverless-webpack";
import nodeExternals from "webpack-node-externals";
import webpack from "webpack";
import bundleAnalyzer from "webpack-bundle-analyzer";
import util from "./util.js";

const {BundleAnalyzerPlugin} = bundleAnalyzer;
const {isDevelopment, resolveWebpackMode: resolveMode} = util;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
    new webpack.DefinePlugin({
        "global.GENTLY": false
    })
];

if (!isDevelopment || process.env.BUNDLE_ANALYZER) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })
    );
}

export default {
    entry: slsw.lib.entries,
    mode: resolveMode(),
    devtool: isDevelopment ? "eval-source-map" : "nosources-source-map",
    target: "node",
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    externals: [nodeExternals({
        allowlist: [
            /@randy\.tarampi\/\w+/
        ]
    }), "aws-sdk"],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    configFile: path.join(__dirname, "./babel.config.js"),
                    envName: "server"
                }
            }
        ]
    },
    plugins,
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    }
};
