/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1734757250147_6631';
  config.jwt = {
    // 私钥
    secret: 'fd7aae59-5b89-4f49-9347-9da1155ee5ac',
    // 过期时间 60s (测试)
    expiresIn: 60,
  };

  // add your middleware config here
  config.middleware = ['cors', 'auth'];

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
