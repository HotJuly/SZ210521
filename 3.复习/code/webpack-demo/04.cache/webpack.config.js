const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {resolve} = require('path');

/*  
    缓存
        浏览器如何判断什么文件需要缓存
            通过名称判断,当前需要的文件名称和已缓存的相同,才能使用对应的缓存文件

        优点:由于后续每次读取文件都是从本地读取,所以不需要发送网络请求,可以加快页面的渲染速度
        缺点:由于后续使用该文件不需要请求服务器,所以很可能导致服务器代码和本地代码不相同的问题

        强缓存
            在返回数据的响应头中,设置cache-control:max-Age=超时时间,只要没有超过超时时间,该文件就会一直存于本地,不断复用
            强缓存的状态码:200
            注意:强缓存是不需要发送请求给服务器的

        协商缓存
            在返回数据的响应头中,设置Last-Modified(当前文件最后修改时间)和Etag(当前文件的hash值)
            协商缓存的状态码:304
            注意:协商缓存是需要发送请求给服务器的

        webpack中三种值的区别
            hash值
                他是当前项目本次构建的唯一标识
            chunkhash值
                他是当前入口文件本次构建的唯一标识
            contenthash值
                他是每个文件自身本次构建的唯一标识
*/

module.exports = {
    entry:"./src/main.js",
    output:{
        filename:"[name].[contenthash:8].js",
        path:resolve(__dirname,'./server/build')
    },
    module:{
        rules:[
            {
                test:/\.less/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
        })
    ],
    resolve:{
        extensions:[".js",".jsx",".vue",".json",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    },
    mode:"development"
}