const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');


module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    /*
        面试题:loader和plugin的区别
            webpack只认识js文件
            loader的作用一般是用于帮助webpack理解编译某类型的文件的工具包
                loader本身并不具备编译代码的能力,真正具有编译代码能力的是一些核心库,例如:less
            plugin的作用一般是给项目提供一些完整的特殊功能的工具包
    */
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
    devServer:{
        port:9090,
        proxy:{
            "/v2/api":{
                target:"https://www.baidu.com",
                ws:true,
                pathRewrite:{
                    "^/v2/api":""
                }
            }
        },
        hot:true,   //热模替换,但是会刷新当前页面,Vuex和data数据会丢失
        hotOnly:true   //热模替换,不会刷新当前页面,Vuex和data数据不会丢失
    },
    resolve:{
        extensions:[".js",".jsx",".vue",".json",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    },
    mode:"development"
}