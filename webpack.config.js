const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "react",
              [
                "env",
                {
                  "targets": {
                    "browsers": ["last 2 versions"]
                  }
                }
              ],
              "stage-0"
            ]
          }
        }
      },
      {
				test: /\.scss|sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
              loader: 'css-loader',
              options: {
								modules: true,
								sourceMap: true,
								camelCase: true,
								minimize: true,
								importLoaders: 1,
								localIdentName: '[local]',
								discardComments: {
									removeAll: true
								}
							}
						},
						{
							loader: 'sass-loader' // compiles Sass to CSS
						}		
					]
				})
			},

    ]
  },
  plugins: [
    new ExtractTextPlugin({
			filename: true ? 'src/styles.css' : 'styles.[hash].css',
		}),
  ],
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};