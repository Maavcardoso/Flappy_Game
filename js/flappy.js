const conteudo = document.querySelector('div[wm-flappy]')
const obstaculo = document.createElement('div')

obstaculo.setAttribute('id','obstaculo')
conteudo.appendChild(obstaculo)

const canoCima = document.createElement('div')
const canoBaixo = document.createElement('div')

canoCima.classList.add('cano')
canoBaixo.classList.add('cano')
obstaculo.appendChild(canoCima)
obstaculo.appendChild(canoBaixo)

let obsPos = 100
obstaculo.style.left = obsPos + '%'
var obsTimer = setInterval(()=>{
        obsPos = obsPos - 1
        obstaculo.style.left = obsPos + '%'
    if(obsPos == -15){
        clearInterval(obsTimer)
    }
    }, 50)
    


