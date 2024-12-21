const Service = require('egg').Service;
const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

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

    const token = this.createToken({ userId: userInfo.userId });

    return {
      ...userInfo,
      token,
    };
  }

  /**
   * 创建token
   * @param {*} data 包涵用户信息的数据
   */
  createToken(data) {
    // 标头 | 负载 | 私钥
    const token = jwt.sign(data, this.config.jwt.secret, {
      expiresIn: 60,
    });

    console.log(token);
    return token;
  }

  // 校验token
  verifyToken(token) {
    return jwt.verify(token, this.config.jwt.secret);
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
  async modifyUser(params) {
    // 鉴权
    try {
      this.verifyToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZWQwOGFkMC1kNTJiLTQyZjYtOWVlOS1iYmJiZWY2ZWU2ODYiLCJpYXQiOjE3MzQ3OTA2ODIsImV4cCI6MTczNDc5MDc0Mn0.tj1rzKcdjKCZT7F4l4M3DvPohvgO7vlRtk-DZ7qE5cY'
      );
      const { ctx } = this;
      const { username } = params;
      const filePath = path.resolve(__dirname, './data.json');
      const data = await ctx.helper.getDataForPath(filePath);

      data[username] = params;

      await ctx.helper.setDataForPath(filePath, data[username]);

      return {
        success: true,
      };
    } catch (err) {
      throw err;
    }
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
