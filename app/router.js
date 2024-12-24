/**
 * @param {Egg.Application} app - egg application
 */
const user = require('./router/user');
const channel = require('./router/channel');

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  user(app);
  channel(app);
};
