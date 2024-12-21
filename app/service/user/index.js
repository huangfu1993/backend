const Service = require('egg').Service;
const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

class UserService extends Service {
  // 登录
  async login(params) {
    const { ctx } = this;
    const { username, password } = params;
    const filePath = path.resolve(__dirname, './data.json');
    const data = await ctx.helper.getDataForPath(filePath);

    const userInfo = data[username];
    // 校验用户
    if (!userInfo) {
      throw '用户不存在！';
    }
    // 校验密码
    if (userInfo.password !== ctx.helper.md5(password)) {
      throw '密码错误！';
    }

    return userInfo;
  }

  // 注册
  async registerUser(params) {
    const filePath = path.resolve(__dirname, './data.json');
    const ctx = this.ctx;
    const { username, password } = params;

    const data = await ctx.helper.getDataForPath(filePath);

    if (data[username]) {
      throw '用户名已存在！';
    }

    if (data.total > 20) {
      throw '超过最大注册值';
    }
    const userId = v4();
    data.total++;
    data[username] = {
      userId,
      username,
      password: ctx.helper.md5(password),
    };
    console.log(data);

    await ctx.helper.setDataForPath(filePath, data);
  }

  // 修改
  async modifyUser() {
    const dataPath = path.resolve(__dirname, './data.json');
    const data = await fs.readFile(dataPath);
    console.log(data, '111111111');
    //
  }

  // 删除
  async deleteUser() {
    const dataPath = path.resolve(__dirname, './data.json');
    const data = await fs.readFile(dataPath);
    console.log(data, '111111111');
    //
  }
}

module.exports = UserService;
