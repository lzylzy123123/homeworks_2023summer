const store = require('./index')
console.log(store.getState());
store.dispatch({ type: 'change_name', name: '2' })
store.dispatch({ type: 'change_age', age:'19' })

console.log(store.getState());