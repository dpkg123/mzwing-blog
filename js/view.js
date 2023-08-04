//设置marked.js的选项（因为有默认值所以就不设太多了）
marked.setOptions({ breaks: true });

//设置缓存
const BlogCache = {};

//定义渲染部分
const Render = {
  //xml渲染函数
  _xml({ name, string }) {
    let returnData = {};
    returnData.name = name + "Xml";
    let data = (new window.DOMParser()).parseFromString(string, "text/xml");

    //载入xml页面样式
    for (let i of data.querySelector("style")) {
      returnData.style = {};
      if (i != undefined) {
        returnData.style.type = "style";
        returnData.style.content = i;
      } else if (i.src != undefined) {
        returnData.style.type = "link";
        returnData.style.src = i.src;
      };
    };

    //载入html
    returnData.html = data.querySelector("html");

    //载入xml页面脚本
    for (let i of data.querySelector("script")) {
      returnData.script = {};
      if (i != undefined) {
        returnData.script.type = "script";
        returnData.script.content = i;
      } else if (i.src != undefined) {
        returnData.script.type = "link";
        returnData.script.src = i.src;
      };
    };
    return returnData;
  },

  //md渲染函数
  _md({ name, string }) {
    let returnData = {};
    returnData.name = name + "Md";
    returnData.content = marked(string);
    return returnData;
  },

  //主函数
  main({ type, name, renderString }) {
    let returnData;
    switch (type) {
      case "md" || "markdown":
        returnData = this._md({ name: name, string: renderString });
        break;
      case "xml":
        returnData = this._xml({ name: name, string: renderString });
    };
  }
};

//定义路由
const Router = {
  //存储地址
  "url": "/",

  //存储路由表
  "table": {
    "/": "/pages/homepage.xml"
  },

  //符合路由表的，直接跳转为路由表所指定的页面
  fitRouterTable() {
    a
  },

  //同步hash到路由
  syncHashToRouter() {
    let hashUrl = window.location.hash;
    let resultUrl = hashUrl; 
    if (resultUrl != this.url) {
      this.url = resultUrl;
    };
    this.upgrade();
  },

  //更新页面
  upgrade() {
    let data = this._fetchData(this.url);
  },

  //获取数据
  _fetchData(url) {
    let returnData;
    fetch(url)
      .then(Response => (returnData = Response));
    return returnData;
  }
};