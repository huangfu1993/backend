module.exports = options => {
  return function* (next) {
    const whiteList = ['http://www.baidu.com', 'http://www.jiujin.com'];
    const url = this.request.header.origin;
    if (whiteList.includes(url)) {
      this.set('Access-Control-Allow-Origin', url);
    } else {
      this.set('Access-Control-Allow-Origin', 'http://localhost'); // 默认允许本地请求跨域
    }
    yield next;
  };
};
