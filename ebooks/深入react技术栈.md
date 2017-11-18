《深入react 技术栈》
        使用 react-css-modules 来避免重复输入style.**

        组件跨级通信 --- context - 就像一个全局变量
                                - 父组件里定义 childContextTypes 和 getChildContext,它下面的子组件都可以拿到this.context里的值
                                - 子组件里定义contextTypes
        没有嵌套关系的组件通信 ---  自定义事件机制（eventemitter / 发布订阅单例就行）

        用decorator 提供mixin功能(core-decorator.js 库，getOwnPropertyDiscriptor,defineProperty)，和createClass 的mixin有所区别
        前者不会覆盖原来的方法，后者会。

        高阶组件 - 进一步抽象可以是一个高阶组件工厂方法，return 一个 hoc方法
                属性代理
                        # 控制props
                        # 通过refs 使用引用 - 可以在高阶组件中获取到 wrappedComponent 的实例
                        # 抽象state - 可以将state 设在高阶组件中，以props 形式传给wrappedComponent

                反向继承 (super 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错；super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类)
                        # 渲染劫持
                        # 控制state


        函数式编程
                - 没有副作用，不会影响函数外面的值； 由于对象为参数是拷贝值引用，所以引入immutable

        pureRender
                - props 不要使用对象字面量，要先付给一个值，然后设置成那个值
                - 为避免事件重复多次绑定，把绑定的事件移到构造器里
                - immutable 结构共享特性，避免深复制带来的性能损耗 内部采用‘trie 树’ （hash树的变种）来存储      
                - key 如果渲染一个列表，key 设为index,只是相当于一个随机键，无论有没有相同的项，页面都会重新渲染。因此，key 应该设为和那一列表项唯一比配的sid,或是其他的，总之要唯一匹配。

        动画
                react-smooth 库
                reactCSSTransitionGroup
                react-motion
                

        测试
                官方utils包 - ReactTestUtils(浅渲染。。。)
                测试框架 - jest(自带mock function等) /Enzyme
                enzyme + sinon(mock function、spy库) 


        持续集成服务器 CI --- 来把整个流程自动化，自动化测试
                有新commit 或是pr 发起后就自动执行测试
                 


        ====生命周期====
        virtual-dom -- ReactElement ReactText ReactFragment
                            |
                             --- ReactComponentElement ReactDOMElement  

        MOUNTING
                getInitialState、componentWillMount、render、componentDidMount
                componentWillMount 中调用 setState 方法是不会触发 re-render的，而是会进行 state 合并
                由于递归渲染，父组件的componentWillMount 在其子组件的 componentWillMount 之前调用，而父组件的 componentDidMount在其子组件的 componentDidMount 之后调用。

        RECEIVE_PROPS
                componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 、componentDidUpdate

                componentDidUpdate 和 componentWillUpdate 里调用setState 导致死循环
                componentWillReceiveProps里拿不到setState 后的最新state,因为setState通常不会触发这个方法
                shouldComponentUpdate 里也拿不到最新的state
        UMOUNTING
                componentWillUnmount


        ====setState===
        当执行 setState 时，会将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state，队列机制可以高效地批量更新 state
        

        ====diff=======
        前提：跨层级移动节点比较少，忽略不计。
             同一层级的子节点可以通过唯一的id进行区分。
             相同类型组件结构相似，否则不一样。

        tree-diff
                分层比较
        component-diff
                同一类型的component 则按照tree-diff来比较
                非同一类型，则替换组件下所有子节点
        element-diff 
                对同一层级的同组子节点添加key来进行区分



        redux 性能优化
                redux-immutable 来替换redux的combineReducer
                
                代理reducer来实现一些功能，如：统计reducer 执行时间，让action只执行特定的reducer,合并处理action，数据后处理操作

                不同的分片state对应不同的reducer,如果要复用同一个reducer也可以通过代理这个reducer的方式来设置不同的actiontype [6.1.1] 

                reducer 增强  ，redux-undo 原理也是代理reducer

                当store发生改变时，所有的connect都会重新计算一遍，reselect 运用闭包原理，使纯函数的参数和结果缓存在内存中。这个闭包也是个代理。抽象selector避免重复计算。[6.4 281]