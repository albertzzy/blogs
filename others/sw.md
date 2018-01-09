## sw
* 利用navigator.serviceWorker 监听message事件，navigator.serviceWorker.controller.postMessage来发送信息。
* 和window.caches联合使用（在window下的install事件时将要缓存的文件放在caches里面），监听window下的fetch事件，拦截请求(caches.match匹配到request 的时候)。
* sw.js 要在你的site 的根目录（他只能对他所在的当前目录下以及子目录下的资源有效果）


## sw-precache
* 在sw 里注册cache 利用的代码。 
* [config option]`runtimeCaching`,背后就是使用了sw-toolbox,帮你制定路由及相应缓存策略。
```js
{
runtimeCaching: [{
    urlPattern: /^https:\/\/example\.com\/api/,
    handler: 'networkFirst'
}, {
    urlPattern: /\/articles\//,
    handler: 'fastest',
    options: {
        cache: {
        maxEntries: 10,
        name: 'articles-cache'
        }
    }
}],
// ...other options as needed...
}
```
* [config option] `dynamicUrlToDependencies` ,服务端渲染时定义,如果一个页面依赖多个模板来构建app shell。
```js
{
  dynamicUrlToDependencies: {
    '/home': ['templates/master.hbs', 'templates/home.hbs'],
    '/about': ['templates/master.hbs', 'templates/about.hbs']
  },
  // ...other options as needed...
}
```


* precache不是免费的，每一个资源activate之前都得先触发install,然后存到cache里，如果资源很多的情况下，不要全部precache. 否则得等到全部install 完，也浪费用户带宽和disk space.(比如一个blog网站，不要设置`staticFileGlobs` 为`'posts/*.html'`,precache所有页面。)，正确的做法是设置runtime caching.

## sw-toolbox
* 用来管理你的dynamic content的cache,并通过`handler` 选项来制定你的缓存策略。
* 定义路由
* 对应sw-precache的config文件的`runtimeCaching` 配置项。