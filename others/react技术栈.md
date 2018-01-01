## react-redux & redux
* redux 里浅比较了nextState 和 PrevState，因此reducer 如果不是返回新的引用，组件会一直re-render
所以提倡immutably 来修改state. 但即使是这样，还是需要你手动在shouldComponentUpdate里进行比较，使得相应的返回false。

* 而react-redux 里面则是在connect 的时候加了这一层逻辑，对selector返回的前后props 进行了浅比较，帮你做了shouldComponentUpdate的事情。
connect的时候还做了一层逻辑，在全局state上订阅了onStateChange，当state改变的时候，则selector重新执行一遍。


* 但是，浅比较毕竟是有局限性的。
```javascript
const mapStateToProps = state => {
  return {
    objects: state.objectIds.map(id => state.objects[id])
  }
}
```
这段代码里每次selector都会返回一个新的数组，但如果数组里的东西都没变，还是会触发re-render。

> 解决的方式有两种：
1. 手动实现shouldComponentUpdate，进行一个深比较，但要注意这个深比较的开销是否超过re-render.
2. 使用Reselect来cache前一次的selector返回的新props，而这个库相当于是selector的一个wrapper.会在调用selector的时候和前一次比较参数的个数，参数（浅比较）是否相同。如果相同就还是返回cache,以此减少selector计算。保证和前一次一样的情况下返回的props是同一个引用。避免re-render.

* 如果存在这种情况,子组件上的绑定事件是父组件传递的:
```javascript

<Child onClick={this.handleClick.bind(this)} />
//每次父组件re-render的时候都会创建一次新的函数引用，优化的方式是 将handleClick绑定在constructor里

```


* 给 ```js mapStateToProps ``` 加速,还是使用 **Reselect**这个库


* 多个container在某些情况下实现优化
    1. 只要你感觉一个父组件里有很多的action 是要传给子组件的，则应该分离出一个container component出来。



## immutable
1. 不适合用于经常改变的小值或是简单值的改变,因为用不着
2. 不方便debug,只能借助 Immutable.js Object Formatter 这种浏览器扩展
3. 有可能会导致性能问题，如下：
```javascript
// AVOID .toJS() in mapStateToProps
function mapStateToProps(state) {
  return {
    todos: state.get('todos').toJS() // Always a new object
  }
}
```
4. 不要在dumb components中使用immutable,因此smart 传给domb component的props 需要经过hoc 转换

> 要配合使用immutable,需要借助**redux-immutable**,这个库重写了combineReducer的逻辑，因为原来的combineReducer操作的是原生的js对象，而immutable js 对象需要用到对应api.这也是store 不能直接是immutable的原因。














