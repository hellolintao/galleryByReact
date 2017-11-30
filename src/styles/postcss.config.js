module.exports = {
    parser: 'postcss-less',
    plugins: {
        'postcss-import': {
        	path:['./style.css']
        },
        'autoprefixer': {
            browers: ['last 5 versions', 'firefox 15','ie >= 12']
        }
        // 'cssnano': {}
    }
}