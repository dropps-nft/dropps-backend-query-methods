const path=require('path');

module.exports = {
  entry: './file.js',
resolve:{
	fallback:{"http": require.resolve("stream-http"),
"https": require.resolve("https-browserify"),
		"crypto": require.resolve("crypto-browserify"),
	},
},
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
