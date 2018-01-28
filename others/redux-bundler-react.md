## redux-bundler-react
1. 分为`provider`, `connect`高阶组件
2. 相比较react-redux 的connect，这里的connect 要简单很多就是在store上watch了一些selector的值，这些值改变的 时候调用setState 方法