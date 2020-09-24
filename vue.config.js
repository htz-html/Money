/* eslint-disable */
const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') //__dirname:意思是当前目录

    config.module  //config就是vue把webpack的api封装了暴露给我们的一个对象
      .rule('svg-sprite') //rule,添加一个规则，规则就是svg-sprite
      .test(/\.svg$/) //这个规则的特点,文件如果能匹配上这个正则，我就要用这个规则
      .include.add(dir).end()//不是让所有的svg都走这个规则，我们只需要icons这个目录下的svg走这个规则
      // 配置loader
      .use('svg-sprite-loader').loader('svg-sprite-loader').options( {extract: false}).end()//我要使用哪些loader；extract: false的意思就是不要把它解析成文件来
      //下面的use和tap，不管你的icon是否默认有颜色，我们都把颜色去掉的操作
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs:'fill'}}]})).end()
      //配置插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) //因为我们这些svg是要走这个loader的，其他的svg就不要管我已经走了这个loader的东西了。
      //最后的解释就是，其他的 svg loader 排除 icons 目录，就是其他的就不要管我这个icons下面的svg
  }
}
