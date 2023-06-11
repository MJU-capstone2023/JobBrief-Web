const { defineConfig } = require('@vue/cli-service')
 module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": { //'/api'가 들어오면 포트 3000(스프링 서버)로 보낸다
        target: "https://job-brief-mjucapstone.com/api",  //백에 맞추기
        changeOrigin: true, // cross origin 
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../backend/public",
};