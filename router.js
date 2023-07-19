const buttons = document.querySelectorAll('button')
const h1s = document.querySelectorAll('h1')
function changepage(){
    const hf = window.location.href.slice(-1)
    h1s.forEach((element, index) => {
        if (index == hf - 1) {
            element.style.display = 'block'
        }
        else {
            element.style.display = 'none'
        }
    })
}

function myPushState(arg){
    history.pushState(...arg)
    changepage()
}

window.onpopstate = function () {
    changepage()
}

// myPushState([null, null, '/1'])

const rp = function () { }
buttons.forEach(element => {
    element.addEventListener('click', () => {
        myPushState([null, null, `/${element.innerHTML}`])
    })
});