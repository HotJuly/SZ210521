const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const {resolve} = require('path');

/*
    树摇 treeshaking
        项目可能具有很多的代码,实际上有部分代码并没有作用,但是打包的时候依旧会带到生产代码中
        导致后果是无形中增加项目体积大小,请求该资源花费时间变长,解析该代码时间变长,最终导致用户首屏渲染速度变慢

    使用注意点:
        1.必须使用ES6模块化语法
        2.需要使用到TerserPlugin插件可以实现
            -简单方法:将mode设置为:production
            -在optimizition中配置树摇,其中具有exclude属性,可以配置某类文件不进行树摇

*/

module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    module:{
        rules:[
            {
                test:/\.less/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        })
    ],
    resolve:{
        extensions:[".js",".jsx",".vue",".json",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    },
    
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            exclude:/\.js/
        })],
    },
    mode:"development"
}