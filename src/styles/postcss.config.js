// postcss的配置文件、
module.exports = {
    parser: 'postcss-less',
    plugins: {
        'postcss-import': {
        	path:['./style.css']
        },
        'autoprefixer': {
            browers: ['last 5 versions', 'firefox 15','ie >= 12']
        }
        // 下面这个是编译去除多余空格、换行等
        // 'cssnano': {}
    }
}