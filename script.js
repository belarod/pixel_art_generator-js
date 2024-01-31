const gridContainer= document.querySelector('.grid__container')
const createGridButton= document.querySelector('#submit-grid')
const clearGridButton= document.querySelector('#clear-grid')
let gridWidth= document.querySelector('#width-range')
let gridHeight= document.querySelector('#height-range')
let colorButton= document.querySelector('#color-input')
const eraseButton= document.querySelector('#erase-button')
const paintButton= document.querySelector('#paint-button')
let widthValue= document.querySelector('#width-value')
let heightValue= document.querySelector('#height-value')

let events= {
    mouse: {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup'
    },
    touch: {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend'
    }
}

let deviceType= ''
let draw= false
let erase= false

const isTouchDevice= () => {
    try{
        document.createEvent('TouchEvent')
        deviceType= 'touch'
        return true
    }catch(error){
        deviceType= 'mouse'
        return false
    }
}

isTouchDevice()

createGridButton.addEventListener('click', () => {
    gridContainer.innerHTML= ''
    let count= 0

    for (let i = 0; i < gridHeight.value; i++){
        count+= 2
        let div= document.createElement('div')
        div.classList.add('gridRow')
        
        for(let j= 1; j < gridWidth.value; j++){
            count+=2
            let col= document.createElement('div')

            col.classList.add('gridCol')
            col.setAttribute('id', `gridCol${count}`)
            col.addEventListener(events[deviceType].down, () => {
                draw= true

                if (erase) {
                    col.style.backgroundColor= 'transparent'
                }else{
                    col.style.backgroundColor= colorButton.value
                }
            })

            col.addEventListener(events[deviceType].move, (evt) => {
                let elementID= document.elementFromPoint(
                    !isTouchDevice() ? evt.clientX : evt.touches[0].clientX,
                    !isTouchDevice() ? evt.clientY : evt.touches[0].clientY
                ).id

                checker(elementID)
            })

            col.addEventListener(events[deviceType].up, () => {
                draw= false
            })

            div.appendChild(col)
        }

        gridContainer.appendChild(div)
    }
})

function checker(elementID){
    let gridColumns= document.querySelectorAll('.gridCol')
    gridColumns.forEach((element) => {
        if(elementID== element.id){
            if(draw && !erase){
                element.style.backgroundColor= colorButton.value
            }else if(draw && erase){
                element.style.backgroundColor= 'transparent'
            }
        }
    })
}

clearGridButton.addEventListener('click', () => {
    gridContainer.innerHTML= ''
})

eraseButton.addEventListener('click', () => {
    erase= true
})

paintButton.addEventListener('click', () => {
    erase= false
})

gridWidth.addEventListener('input', () => {
    widthValue.innerHTML= gridWidth.value< 9 ? `0${gridWidth.value}` : gridWidth.value
})

gridHeight.addEventListener('input', () => {
    heightValue.innerHTML= gridHeight.value< 9 ? `0${gridHeight.value}` : gridHeight.value
})

window.onload= () => {
    gridHeight.value= 0
    gridWidth.value= 0
}