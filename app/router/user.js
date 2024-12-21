module.exports = app => {
  app.router.get('/user/login', app.controller.user.index.login);
  app.router.get('/user/register', app.controller.user.index.registerUser);
  app.router.get('/user/modify', app.controller.user.index.modifyUser);
};
