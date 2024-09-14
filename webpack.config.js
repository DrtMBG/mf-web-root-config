const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
    const orgName = "projectmbh";
    const defaultConfig = singleSpaDefaults({
        orgName,
        projectName: "root-config",
        webpackConfigEnv,
        argv,
        disableHtmlGeneration: true,
        // proxyConfig: "src/proxy.conf.json",
    });

    const htmlWebpackPlugin = new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
            goal: webpackConfigEnv.goal,
            orgName,
        },
    });

    console.log("Goal: ", webpackConfigEnv.goal);

    return merge(defaultConfig, {
        plugins: [htmlWebpackPlugin],
    });
};
