//设置页面标题
document.querySelector("title").innerHTML = BlogCache.conf.name;

//设置标题
document.querySelector("#pageTitle").innerHTML = BlogCache.conf.name;

//设置导航栏链接
for (let i of BlogCache.conf.link) {
  let li = document.createElement("li");
  li.innerHTML = `<a href="#${i.url}">${i.name}</a>`;
  if (i.class != undefined) {
    li.className = i.class;
  };
  if (i.id != undefined) {
    li.id = i.id;
  };
  document.querySelector("nav").appendChild(li);
};

//监听hash变化并动态改变Router.url
window.addEventListener("hashchange", () => {
  Router.syncHashToRouter();
}, false);

//载入插件js文件
for (let i of BlogCache.conf.extensions.main) {
  let js = document.createElement("script");
  js.src = i;
  document.querySelector("body").appendChild(js);
};