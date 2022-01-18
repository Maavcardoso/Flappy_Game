let conteudo = document.querySelector('div[wm-flappy]')
let body = document.querySelector('body')

const playButton = document.createElement('button')
body.appendChild(playButton)
playButton.innerText = 'Play'

var gameOverCheck = false


var buttonChecker = setInterval(()=>{

    if (gameOverCheck === true){
        body.appendChild(playButton)
        playButton.innerText = 'Again?'

    }else{

        playButton.onclick = ()=>{
            conteudo.innerHTML = ''
            body.removeChild(playButton)
            flappyGame()
            gameOverCheck = false
        }
        
    }
},1)


    

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

    // Cria conjunto de canos (Divs)
        const canoCima = document.createElement('div')
        canoCima.setAttribute('id','canoCima')
        const canoBaixo = document.createElement('div')
        canoBaixo.setAttribute('id','canoBaixo')
        canoCima.classList.add('cano')
        canoBaixo.classList.add('cano')
        obstaculo.appendChild(canoCima)

    // Controla aleatoriedade dos canos
        let randomNum = (Math.floor(Math.random() * 13) + 4 ) * 5
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
    // Inicia Animação / Colisor / Score
        boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider)
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
obsGenerator();


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
    if(playerTop < 95){
    playerTop += 0.1
    player.style.top = (playerTop) + '%'
    }else{
        clearInterval()
    }
},1)

// Colisão dos objetos
function boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider){ 
    var collisionCheck = setInterval(()=>{
    let canoCimaAxis = canoCimaCollider.getBoundingClientRect()
    let playerAxis = playerCollider.getBoundingClientRect()
    let canoBaixoAxis = canoBaixoCollider.getBoundingClientRect()
    if(canoBaixoAxis.height == 0){
        canoBaixoAxis.y = 560
    }
        // Game Over
        if (playerAxis.x + playerAxis.width >= canoCimaAxis.x &&
            playerAxis.x <= canoCimaAxis.x + canoCimaAxis.width && (
                canoCimaAxis.y + canoCimaAxis.height >= playerAxis.y ||
                canoBaixoAxis.y < playerAxis.y + playerAxis.height ) 
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

