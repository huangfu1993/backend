const Service = require('egg').Service;
const path = require('path');
const { v4 } = require('uuid');

class ChannelService extends Service {
  // 创建频道
  async createChannel(params) {
    const filePath = path.resolve(__dirname, './data.json');
    const ctx = this.ctx;
    const { label, status } = params;
    const data = await ctx.helper.getDataForPath(filePath);
    const channelId = v4();
    data.push({ label, status, channelId, isDelete: false });

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
}

module.exports = ChannelService;
