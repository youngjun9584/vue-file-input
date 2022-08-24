module.exports = {
    outputDir: 'dist',
    configureWebpack: { //개발자모드에서 소스코드 보기
        devtool: 'source-map'
    },
    devServer: {
        overlay: false
    }
}