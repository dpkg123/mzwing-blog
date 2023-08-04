//获取RSS文件
fetch(`${window.location.protocol}//${window.location.host}/rss.xml`)
  .then(Response => (BlogCache.rss = Response));

//获取配置
fetch(`${window.location.protocol}//${window.location.host}/conf.json`)
  .then(response => response.json())
  .then(data => {
    //存储配置
    BlogCache.conf = data;

    //载入init.js文件
    let js = document.createElement("script");
    js.src = "/js/init.js";
    document.querySelector("body").appendChild(js);
  })
  .catch(console.error);