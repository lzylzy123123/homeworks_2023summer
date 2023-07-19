const targetMap = new WeakMap()//存储响应式对象
let activeEffect = []//存储订阅者

const effect = (eff) => {//存储副作用，或者说computed里的运算
    activeEffect.push(eff)
    eff()
    activeEffect.pop()
    //动态修改依赖的函数
}


const track = (target, key) => {
    if (activeEffect[activeEffect.length - 1]) { // 判断当前是否有 activeEffect
 
        let depsMap = targetMap.get(target)
        if (!depsMap)
            targetMap.set(target, depsMap = new Map())
        //对应的响应式属性
        let dep = depsMap.get(key)//获取对象属性对应的副作用
        if (!dep)
            depsMap.set(key, dep = new Set())

        dep.add(activeEffect[activeEffect.length - 1]) // 增加副作用
    }
}

const trigger = (target, key) => {
    const depsMap = targetMap.get(target)
    if (!depsMap) return

    const dep = depsMap.get(key)
    if (!dep) return
   
    dep.forEach(inner => effect(inner)) // 执行副作用
}


const reactive = (target) => {
    return new Proxy(
        target, // 被代理的对象,通过闭包传递参数
        {
            get (target, key, receiver) {
                const result = Reflect.get(...arguments)
                track(target, key)
                return result
            },
            set (target, key, value, receiver) {
                let oldValue = target[key]//暂时用不上
                Reflect.set(...arguments)
                trigger(target, key)
                return value
            }
        })
}

const ref = raw => {//和reactive的实现没什么区别
    const r = {
        get value () {
            track(r, 'value');
            return raw;
        },

        set value (newVal) {
            raw = newVal;
            trigger(r, 'value');
        }
    }
    return r;
}

const computed = getter => {
    let result = ref();
    effect(() => result.value = getter());
    return result;
}

let product = reactive({ price: 10, quantity: 2 });
let total = 0, salePrice = ref(0);
// let salePrice = computed(() => {
//     return product.price * 0.9;
// })
// let total = computed(() => {
//     return salePrice.value * product.quantity;
//salePrice自身也是计算属性，不断嵌套调用下去
// })

effect(() => total = salePrice.value * product.quantity);//调用get
effect(() => salePrice.value = product.price * 0.9);
console.log(total, salePrice.value); //用计算属性的话改成total.value

product.quantity = 5;
console.log(total, salePrice.value); 

product.price = 20;
console.log(total, salePrice.value); 