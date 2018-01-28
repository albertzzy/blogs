## redux-bundler
1. 将 `reducer` , `selector`, `actionCreator` 三者放在一个bundle里。多个bundle最后compose成一个trunk。
2. 每个bundle中会定义几个selector 来watch这些selector对应的store值。当watch的这些值改变的时候就触发相应的`subscription.fn`。这部分逻辑是根据`store.subscribe(()=>{..watch logics..})`来做的。里面给store加了一个方法`store.subscribeToSelectors` 和 `store.subscribeToAllChanges` 来做订阅。
3. `Object.assign(store, bindActionCreators(processed.actionCreators, store.dispatch))`这段代码是说`store[actionCreator的name]`可以直接dispatch 这个action. 
4. 类似的
```js
 const bindSelectorsToStore = (store, selectors) => {
  for (const key in selectors) {
    const selector = selectors[key]
    if (!store[key]) {
      store[key] = () =>
        selector(store.getState())
    }
  }
}
```
这段代码是说store[selector的name] 可以返回一个方法，这个方法返回selector的值。




### 相关apis
1. `reducer` 来定义reducer , `getReducer` 来返回reducer.
2. `selectX` 来定义selector
3. `reactX` 来定义selector,不同的是,他返回的东西都会自动被dispatch
4. `doX` 来定义actionCreator
5. `getExtraArgs(store)` 这个function返回的可以被所有bundle的所有actionCreator拿到
6. `init(store)` 这个方法代表store return之前的最后一步。可以用来注册window相关的event,或者其他的初始化。
7. `name` 来定义export 出去的reducer的名字，每个bundle只有一个reducer.


