dom.splitText  

diff.js
    判断是否是在diff svg，或者在svg 里diff
    1. 如果vnode 是null/ boolean 则渲染成空文本节点
    2. 如果是string / number 则渲染成文本节点
    3. 如果是一个component 则进行component diff
    4. 如果type 是不同的则直接重新创建一个，把原来的删掉
    5. children diff
    6. attribute diff
