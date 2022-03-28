module.exports = {
  //打包配置，解决页面空白的配置方案。

  publicPath: process.env.NODE_ENV == "production" ? "./" : "/",

  lintOnSave: true, //输出文件目录

  outputDir: "net_safe_flatform", //webpack配置

  configureWebpack: {
    //关闭webpack的性能提示
    performance: {
      hints: false,
    },
  },

  pages: {
    index: {
      //入口文件

      entry: "src/main.js" /*这个是根入口文件*/, //模板文件
      template: "public/index.html", //输出文件
      filename: "index.html", //页面title

      title: "外网安全态势感知系统",

      assetsPublicPath: "./",
    },
  }, //配置跨域

  devServer: {
    open: true,

    host: "0.0.0.0",

    port: 3000,

    https: false, 
    //以上的ip和端口是我们本机的;下面为需要跨域的 
    //proxy:{ ////配置跨域 //'/api':{ //target:'http://192.168.10.99:7777/eyex/',
    //这里后台的地址模拟的;应该填写你们真实的后台接口 //ws:true, //changOrigin:true,//允许跨域 
    //pathRewrite:{ //'^/api':''//请求的时候使用这个api就可以 //} //} //}
  },
};
