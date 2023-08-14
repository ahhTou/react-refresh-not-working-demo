const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { ModuleFederationPlugin } = webpack.container

// const UNIQUE_NAME = 'app-1'

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/bootstrap.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        // uniqueName: UNIQUE_NAME,
    },
    devServer: {
        hot: true,
        port: 9002,
        historyApiFallback: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, './src'),
            },
        ],
    },

    // optimization: {
    //     runtimeChunk: isDevelopment ? 'single' : 'multiple',
    // },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),

        isDevelopment && new ReactRefreshPlugin(),

        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),

        new ModuleFederationPlugin({
            name: 'app2',
            exposes: {
                './index': './src/func.ts',
            },
            shared: {
                react: {
                    eager: true,
                    singleton: true,
                    requiredVersion: '^17.0.2',
                },
                'react-dom': {
                    eager: true,
                    singleton: true,
                    requiredVersion: '^17.0.2',
                },
            },
        }),
    ],
}
