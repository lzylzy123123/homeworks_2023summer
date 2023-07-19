const createStore = require('./redux')
const initialState = { name: '1', age: '18' }

function reducer(state = initialState, action='') {
    if (action.type === 'change_name') {
        return { ...state, name: action.name }
    }
    if (action.type === 'change_age') {
        return { ...state, age: action.age }
    }

    return state
}

const store = createStore(reducer)

module.exports = store

