const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { ModuleFederationPlugin } = webpack.container

// const UNIQUE_NAME = 'app-1'

module.exports = {
    mode: 'development',
    entry: './src/bootstrap.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        // uniqueName: UNIQUE_NAME,
    },
    devServer: {
        hot: true,
        port: 9001,
        historyApiFallback: false,
        static: [
            {
                publicPath: '/',
            },
            {
                directory: path.resolve(__dirname, '../app-2/dist'),
                publicPath: '/app2',
            },
        ],
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

        new ReactRefreshPlugin(),

        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),

        new ModuleFederationPlugin({
            name: 'app1',
            remotes: {
                // 复现: cd ../app-2 && npm run build
                app2: 'app2@http://localhost:9001/app2/app2.js',

                // 正常: cd ../app-2 && npm run start
                // app2: 'app2@http://localhost:9002/app2.js',
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
