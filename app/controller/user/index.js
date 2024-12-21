const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const ctx = this.ctx;
    const user = await ctx.service.user.index.login(ctx.query);
    ctx.body = {
      user,
    };
  }

  // 注册
  async registerUser() {
    const ctx = this.ctx;
    console.log(ctx.query);
    const user = await ctx.service.user.index.registerUser(ctx.query);
    ctx.body = {
      user,
    };
  }

  // 修改
  async modifyUser() {
    const ctx = this.ctx;
    const user = await ctx.service.user.index.login(ctx.query);
    ctx.body = {
      user,
    };
  }

  // 删除
  async deleteUser() {
    const ctx = this.ctx;
    const user = await ctx.service.user.index.login(ctx.query);
    ctx.body = {
      user,
    };
    //
  }
}

module.exports = UserController;
