module.exports = {	
	preset: '@vue/cli-plugin-unit-jest',
	//https://github.com/vuejs/vue-jest/issues/199 
    moduleNameMapper: {
	  "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
	}
}
