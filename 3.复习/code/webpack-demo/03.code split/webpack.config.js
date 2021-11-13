const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const {resolve} = require('path');

/*
    代码分割 code split
        多入口打包
            多个文件(A)中同时依赖于一个文件(B),此时没有任何配置的情况下,这个文件的代码会在每个A中都存有一份,
            导致无形中增加项目体积大小,请求该资源花费时间变长,解析该代码时间变长,最终导致用户首屏渲染速度变慢

            配置流程:
                -在optimizition中配置splitChunks.chunks="all",可以将多个文件的共同依赖单独拆解为一个js文件
                    由于splitChunks默认的最小拆解体积是20000B,所以需要在配置minSize:1,将大于1B的代码都拆解出来

        单入口打包
            单入口文件的代码分割,其实就是代码懒加载
                将部分代码切割成单独文件,等达到某种特定状态,才会再次发送请求加载该文件
            webpack配合import函数实现的

            面试题:如何自定义chunk名称
                在import引入文件的时候,在路径之前写上注释webpackChunkName:"名称" 即可
*/

module.exports = {
    // entry:{
    //     main:"./src/main.js",
    //     home:"./src/home.js"
    // },
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
        splitChunks:{
            chunks:"all",
            minSize:1
        }
    },
    mode:"development"
}