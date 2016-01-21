var path = require('path');

module.exports = {
	entry: './src/components/index.jsx',
	output: {
    path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
    publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				include: path.join(__dirname, 'src'),
				query: {
					presets: ['stage-2', 'es2015', 'react']
				}
			}
		]
	},
	resolve: {
		root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
		extensions: ['', '.js', '.jsx']
	}
};
