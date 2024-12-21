const crypto = require('crypto');
const fs = require('fs').promises;

// 加密
exports.md5 = str => {
  return crypto.createHash('md5').update(str).digest('hex');
};

// 通过filepath获取数据，并转成JSON
exports.getDataForPath = async filepath => {
  try {
    const data = await fs.readFile(filepath);
    return JSON.parse(data.toString());
  } catch (err) {
    throw err;
  }
};

// 给指定的path数据重新赋值
exports.setDataForPath = async (dataPath, data) => {
  try {
    const str = JSON.stringify(data);
    await fs.writeFile(dataPath, str);
  } catch (err) {
    throw err;
  }
};
