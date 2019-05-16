const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  root: path.resolve(__dirname, './'),
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

const defaults = {
  PORT: process.env.PORT || 8080,
};

const reStyle = /\.css$/;
const reTypeScript = /\.tsx?$/;
const minimizeCssOptions = {
  discardComments: { removeAll: true },
};

module.exports = (env = defaults) => {
  console.log({ env });
  const isBuild = !!env.build;
  const isDev = !env.build;
  const isSourceMap = !!env.sourceMap || isDev;

  return [
    {
      cache: true,
      devtool: isDev ? 'eval-source-map' : 'source-map',
      devServer: {
        contentBase: PATHS.root,
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        overlay: true,
        port: env.PORT || 8080,
      },
      target: 'web',
      context: PATHS.src,

      entry: {
        app: 'index.tsx',
      },
      output: {
        path: PATHS.dist,
        filename: isDev ? 'vendor.[hash].js' : 'vendor.[contenthash].js',
        publicPath: '/',
        chunkFilename: isDev ? '[name].[hash].js' : '[name].[contenthash].js',
      },

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        modules: ['src', 'node_modules'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },

      module: {
        rules: [
          {
            test: reTypeScript,
            include: PATHS.src,
            use: env.awesome
              ? [
                  { loader: 'react-hot-loader/webpack' },
                  {
                    loader: 'awesome-typescript-loader',
                    options: {
                      transpileOnly: true,
                      useTranspileModule: false,
                      sourceMap: isSourceMap,
                    },
                  },
                ]
              : [
                  { loader: 'react-hot-loader/webpack' },
                  {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                      compilerOptions: {
                        sourceMap: isSourceMap,
                        target: isDev ? 'es2015' : 'es5',
                        isolatedModules: true,
                        noEmitOnError: false,
                      },
                    },
                  },
                ],
          },
          {
            test: /\.(css|scss)$/,
            include: PATHS.src,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-url')(),
                    require('postcss-preset-env')({
                      /* use stage 2 features (defaults) */
                      stage: 2,
                    }),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({
                      disabled: !isBuild,
                    }),
                  ],
                },
              },
            ],
          },
        ],
      },
      optimization: {
        splitChunks: {
          name: true,
          cacheGroups: {
            commons: {
              chunks: 'initial',
              minChunks: 2,
            },
            vendor: {
              chunks: 'all',
              test: /node_modules/,
            },
          },
        },
        runtimeChunk: true,
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        }),
        new HtmlWebpackPlugin({
          template: path.join(PATHS.src, 'assets/index.html'),
        }),
        ...(isDev
          ? [
              new webpack.HotModuleReplacementPlugin({
                // multiStep: true, // better performance with many files
              }),
              new webpack.NamedModulesPlugin(),
            ]
          : []),
        ...(isBuild
          ? [
              new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
              }),
              new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                compress: {
                  screw_ie8: true,
                },
                comments: false,
                sourceMap: isSourceMap,
              }),
            ]
          : []),
      ],
    },
    {
      entry: './src/server.ts',
      target: 'node',
      mode: isDev ? 'development' : 'production',
      devtool: isDev ? 'eval-source-map' : 'source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
      },
      output: {
        filename: 'server.js',
        path: PATHS.dist,
      },
    },
  ];
};
