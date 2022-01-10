
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

        let randomNum = (Math.floor(Math.random() * 11) + 4 ) * 5

        canoCima.style.height = randomNum + '%'
        canoBaixo.style.height =  (70 - randomNum )  + '%' 
        obstaculo.appendChild(canoBaixo)
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
player.style.position = 'absolute'
let playerTop = 
player.addEventListener('keydown',()=>{
    
    player.style.top =+ 1;
})