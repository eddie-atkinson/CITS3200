module.exports = {
  transpileDependencies: ['vuetify'],
  // chainWebpack: config => {
  //   config
  //     .plugin('html')
  //     .tap(args => {
  //     args[0].title = '<Conference Converter Application>';
  //     return args;
  //   });
  // },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: '/public/acg_sqaure.ico',
        },
      },
    },
  },
};
