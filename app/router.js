/**
 * @param {Egg.Application} app - egg application
 */
const user = require('./router/user');

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  user(app);
};
