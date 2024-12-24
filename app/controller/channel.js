const Controller = require('egg').Controller;

class UserController extends Controller {
  // 创建
  async createChannel() {
    const ctx = this.ctx;
    const user = await ctx.service.channel.index.createChannel(
      ctx.request.body
    );

    ctx.body = {
      user,
    };
  }
}

module.exports = UserController;
