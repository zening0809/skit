module.exports = {
    plugins: loader => [
        require("autoprefixer"),
        require("postcss-flexibility"),
        require('postcss-import'),
        require('autoprefixer'),
        require('precss'),
        require('postcss-calc'),
        require('postcss-mixins'),
        require("postcss-selector-not"),
        require('postcss-nested')
    ]
};
