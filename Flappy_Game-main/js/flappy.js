let conteudo = document.querySelector('div[wm-flappy]')
let body = document.querySelector('body')

const playButton = document.createElement('button')
body.appendChild(playButton)

var gameOverCheck 

playButton.innerText = 'Play'


var buttonChecker = setInterval(()=>{

    if (gameOverCheck != true ){
        playButton.onclick = ()=>{
            gameOverCheck = false
            playButton.innerHTML = ''
            playButton.disabled = true
            flappyGame()
        }
    } else {
        playButton.disabled = false
        playButton.innerHTML = 'Again?'
        playButton.onmousedown = ()=>{
        conteudo.innerHTML = ''
        }
        playButton.onclick = ()=>{
            gameOverCheck = false
            playButton.disabled = true
            playButton.innerHTML = ''
            flappyGame()
        }
    }
},10)


    

function flappyGame(){
    

// Cria o passáro
const player = document.createElement('img')
player.setAttribute('id','player')
conteudo.appendChild(player)
player.src = 'imgs/passaro.png'
let playerTop = 50
playerMove(player)

// Cria o Score
var scoreVar = 0
const score = document.createElement('div')
score.setAttribute('id', 'score')
conteudo.appendChild(score)
score.innerHTML = scoreVar




// *** Controla criação dos obstaculos ***
function obsGenerator(){

    // Cria o objeto.
        const obstaculo = document.createElement('div')
        obstaculo.setAttribute('id','obstaculo')
        conteudo.appendChild(obstaculo)
        gameOverCheck = false

    // Cria conjunto de canos (Divs)
        const canoCima = document.createElement('div')
        canoCima.setAttribute('id','canoCima')
        const canoBaixo = document.createElement('div')
        canoBaixo.setAttribute('id','canoBaixo')
        canoCima.classList.add('cano')
        canoBaixo.classList.add('cano')
        obstaculo.appendChild(canoCima)

    // Controla aleatoriedade dos canos
        let randomNum = (Math.floor(Math.random() * 7) + 2 ) * 10
        //let randomNum = (Math.floor(Math.random() * 2) + 7 ) * 10  // Teste p/ Cenário com canoBaixo = null
        canoCima.style.height = randomNum + '%'

    // Se o cano de cima for maior que 80% da altura, cria apenas um gap
        if(randomNum < 80){
            obstaculo.appendChild(canoBaixo)
            canoBaixo.style.height =  (80 - randomNum )  + '%'
        } 
    // Posiciona obstáculo p/ a animação.
        obstaculo.style.left = '100%'

    // Cria variaveis apra os colisores
        let canoCimaCollider = canoCima
        let playerCollider = document.getElementById('player')
        let canoBaixoCollider = canoBaixo 
        let conteudoCollider = conteudo
    // Inicia Animação / Colisor / Score
        boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider, conteudoCollider)
        obsTime(obstaculo)
    
};


// Controla o movimento / destruição dos obstáculos
function obsTime(div){
let obsPos = 100
let obsInterval = setInterval(function obsMove(){
    obsPos = obsPos - 0.05
    div.style.left = obsPos + '%' 
    if(obsPos < -15){
        clearInterval(obsInterval)
        conteudo.removeChild(div)
    }
    if(gameOverCheck === true){
        clearInterval(obsInterval)
    }
    },1)
};

// Controla quantos obstáculos são criados
var obsGeneratorInterval = setInterval(()=>{obsGenerator()}, 3000)
obsGenerator()


// Controla movimento do jogador
document.addEventListener("keydown", playerMove);
function playerMove() {
        playerMoveCheck = true
        if(playerTop > 2){
            playerTop -= 8
            player.style.top = (playerTop) + '%';
        }
    }

    document.addEventListener('keyup', ()=>{
        playerMoveCheck = false
    })

// 'Gravidade' (Puxa o passáro quando o jogador está parado)

let gravityCallback = setInterval(()=>{
    if(playerTop < 98){
    playerTop += 0.12
    player.style.top = (playerTop) + '%'
    }else{
        clearInterval()
    }
},1)

// Colisão dos objetos
function boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider, obsCollider){ 
    var collisionCheck = setInterval(()=>{
    let canoCimaAxis = canoCimaCollider.getBoundingClientRect()
    let playerAxis = playerCollider.getBoundingClientRect()
    let canoBaixoAxis = canoBaixoCollider.getBoundingClientRect()
    let conteudoAxis = obsCollider.getBoundingClientRect()
    if(canoBaixoAxis.height == 0){
        canoBaixoAxis.y = (conteudoAxis.height + (conteudoAxis.y*0.98))
    }

        // Game Over
        if ((playerAxis.x + playerAxis.width >= canoCimaAxis.x &&
            playerAxis.x <= canoCimaAxis.x + canoCimaAxis.width && (
                canoCimaAxis.y + canoCimaAxis.height >= playerAxis.y ||
                canoBaixoAxis.y < playerAxis.y + playerAxis.height )) ||
                (conteudoAxis.height + (conteudoAxis.y*0.98)) < playerAxis.y + playerAxis.height
                
            ){
            gameOverCheck= true
            clearInterval(obsGeneratorInterval)
            clearInterval(collisionCheck)
            clearInterval(gravityCallback)
            document.removeEventListener('keydown', playerMove)
            }
        if (playerAxis.x == canoCimaAxis.x){
            scoreVar += 1
            score.innerHTML = scoreVar
            
        }
        }
        
    ,1)
    
};
}
