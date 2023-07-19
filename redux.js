class Store {
    constructor(params) {
        this.st = {...params()};
        this.reducer = params
    }
    dispatch(params) {
        const newst = this.reducer(this.st, params)
        this.st = newst
    }
    getState(){
        return this.st
    }
}
function createStore(reducer) {
    const store = new Store(reducer)
    return store
}

module.exports = createStore