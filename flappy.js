const conteudo = document.querySelector('div[wm-flappy]')

function obsGenerator(){

        const obstaculo = document.createElement('div')

        obstaculo.setAttribute('id','obstaculo')
        conteudo.appendChild(obstaculo)

        const canoCima = document.createElement('div')
        const canoBaixo = document.createElement('div')

        canoCima.classList.add('cano')
        canoBaixo.classList.add('cano')
        obstaculo.appendChild(canoCima)

        let randomNum = (Math.floor(Math.random() * 13) + 4 ) * 5

        canoCima.style.height = randomNum + '%'

        if(randomNum < 80){
        obstaculo.appendChild(canoBaixo)
        canoBaixo.style.height =  (80 - randomNum )  + '%'
        } 
        obstaculo.style.left = '100%'
        obsTime(obstaculo)
}



function obsTime(div){
var obsPos = 100
var obsInterval = setInterval(function obsMove(){
    obsPos = obsPos - 0.1
    div.style.left = obsPos + '%' 
    if(obsPos < -15){
        clearInterval(obsInterval)
        conteudo.removeChild(div)
    }
    },10)
}

function obsGenRepeater () {
    obsGenerator()
    setInterval(()=>{ 
        obsGenerator()
    }, 4000)
}
obsGenRepeater()


const player = document.createElement('img')

player.setAttribute('id','player')
conteudo.appendChild(player)
document.getElementById('player').src = 'imgs/passaro.png'


let playerTop = 50

let gravityVerifier = true

var gravity = 
    
    setInterval(()=>{
        if(playerTop < 95)
        playerTop += 0.2
        player.style.top = (playerTop) + '%'
},10)

document.addEventListener('keydown',()=>{
    if(playerTop > 2){
    playerTop -= 2
    player.style.top = (playerTop) + '%';
    }
})
const delay = 2;
const limit = 2;
let i = 1;

