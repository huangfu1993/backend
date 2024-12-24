module.exports = (options = { required: true }) => {
  return async (ctx, next) => {
    let token = ctx.headers.authorization;
    console.log(token);
    token = token
      ? token.split('Bearer ')[1] // Bearer空格token数据
      : null;

    if (token) {
      try {
        const data = ctx.service.user.verifyToken(token);
        console.log(data);
        ctx.user = data;
      } catch (err) {
        ctx.throw(401);
      }
    } else if (options.required) {
      ctx.throw(401);
    }

    await next();
  };
};
