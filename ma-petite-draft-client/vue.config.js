const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../ma-petite-draft-server/build-front'),
	devServer: {
		proxy: {
			'/api': {
				target: `http://localhost:${process.env.PORT}`
			}
		}
	}
}
