import { useEffect, useRef, useState } from "react";

function useDebounce(fn, delay) {
  const { current } = useRef({ fn, timer: null });//防止timer重渲染被重置
  useEffect(function () {
    current.fn = fn;
  });

  return function f() {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.apply(this);
    }, delay);
  }
}
function useThrottle(fn, delay) {
  const { current } = useRef({ fn, timer: null })
  useEffect(function () {
    current.fn = fn;
  })
  return function f() {
    if (!current.timer) {
      current.fn.apply(this);
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);

    }
  }
}
function useMount(fn){
  useEffect(fn,[])
}
function useUnMount(fn){
  useEffect(()=>{
    return fn
  })
}
const useRouter = () => {
  const pathname=window.location.href
  useEffect(()=>{
    console.log(pathname)
  })
  return {
      pathname,
      push(){},
      replace(){},
  }
}

export default function Test() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick1 = useDebounce(function () {
    setCounter1(counter1 + 1)
  }, 1000)
  const handleClick2 = useThrottle(function () {
    setCounter2(counter2 + 1)
  }, 1000)
  useMount(()=>console.log('usemount'))
  useUnMount(()=>console.log('useUnMout'))
  console.log(useRouter().pathname); 
  return (
    <div>
      <button onClick={handleClick1}>click1
      </button>
      <div>{counter1}</div>
      <button onClick={handleClick2}>click2
      </button>
      <div>{counter2}</div>
    </div>
  )
}