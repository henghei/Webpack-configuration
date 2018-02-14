const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports={
	// 入口文件
	entry : {
		entryFist:'./src/index.js'
		//例  b:'./src/jj.js'
		// 以上为写入多个入口文件接口

	},
	// 出口文件
	output:{
		// filename: '[name].bundle.js',	//根据入口文件动态生成出口文件
		path:path.resolve(__dirname,'dist'),//path.resolve(__dirname)  此为当前路径;此路径下的打包文件可在浏览器中访问,
     //publicPath:__dirname + '/dist',
    //默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问
		filename:'[name].bundle.js'//根据入口文件，动态生成bundle名称
	},

    plugins: [		
      new HtmlWebpackPlugin({
        title: 'Output Management'
      }),
      new webpack.NamedModulesPlugin(),//热替换
      new webpack.HotModuleReplacementPlugin(),//热替换
      //以上表示重新构建后，将使用新生成的bundle.js代替旧 的bundle.js
      new UglifyJSPlugin(),//删除bundle导出中未用到的代码
      new CleanWebpackPlugin(['dist'])//用于在build之前删除之前生成的build文件
    ],
    devtool: 'inline-source-map',//查找具体报错
    devServer: {
      contentBase: path.join(__dirname, "dist"),//服务器查找文件的位置
      compress: true,
      historyApiFallback:true,//任意的 404 响应都要被替代为 index.html
      port: 3000,//此配置默认会在localhost:8080下建立服务器，并监听dist文件夹下打包生成的文件
      hot: true//启用热替换（HRM）
    },
	module:{
		 rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
	}
}
