[http://jiongks.name/blog/announcing-vue-2/]
和 Vue 的响应式系统结合在一起之后,不需要 shouldComponentUpdate，也不需要 immutable 数据 - it just works.
Vue 2.0 提供了内建的流式服务端渲染 - 在渲染组件时返回一个可读的 stream，然后直接 pipe 到 HTTP response。

snabbdom
    用key 和 selector 来唯一区分vnode ,如果是一样的，则patch ,否则重新创建
    thunk 这种优化策略  - 见github readme.md