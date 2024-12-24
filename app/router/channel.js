module.exports = app => {
  // 注册的中间件
  const auth = app.middleware.auth();
  app.router.post('/channel/createChannel', auth, app.controller.user.login);
};
