module.exports = app => {
  app.router.post('/user/login', app.controller.user.login);
  app.router.get('/user/register', app.controller.user.registerUser);
  app.router.get('/user/modify', app.controller.user.modifyUser);
};
