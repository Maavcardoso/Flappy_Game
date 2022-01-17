let conteudo = document.querySelector('div[wm-flappy]')
let gameOverCheck = false

// Cria o passáro
const player = document.createElement('img')
player.setAttribute('id','player')
conteudo.appendChild(player)
player.src = 'imgs/passaro.png'
playerMove(player)

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
        // let randomNum = (Math.floor(Math.random() * 13) + 4 ) * 5
        let randomNum = (Math.floor(Math.random()*2 ) + 7 ) * 10

        canoCima.style.height = randomNum + '%'
    // Se o cano de cima for maior que 80% da altura, cria apenas um gap
        if(randomNum < 80){
            obstaculo.appendChild(canoBaixo)
            canoBaixo.style.height =  (80 - randomNum )  + '%'
        } 
    // Seta obstáculo p/ a animação.
        obstaculo.style.left = '100%'
        obsTime(obstaculo)
        let canoCimaCollider = document.getElementById('canoCima')
        let playerCollider = document.getElementById('player')
        let canoBaixoCollider = document.getElementById('canoBaixo')
        var boxCollisionTimer = boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider)
        
};


// Controla o movimento / destruição dos obstáculos
function obsTime(div){

let obsPos = 100
let obsInterval = setInterval(function obsMove(){
    obsPos = obsPos - 0.1
    div.style.left = obsPos + '%' 
    if(obsPos < -15){
        clearInterval(obsInterval)
        conteudo.removeChild(div)
    }
    },10)
};

// Controla quantos obstáculos são criados
function obsGenRepeater () {
    obsGenerator()
let obsGeneratorInterval = setInterval(()=>{ 
        obsGenerator()
    
    }, 3000)
};
obsGenRepeater();

// Controla movimento do jogador
function playerMove(player){

    let playerTop = 50
    let playerMoveCheck = false   

    document.addEventListener('keydown',()=>{
        playerMoveCheck = true
        if(playerTop > 2){
            playerTop -= 8
            player.style.top = (playerTop) + '%';
        }
    })

    document.addEventListener('keyup', ()=>{
        playerMoveCheck = false
    })


    let gravityCallback = function(){
        if(playerMoveCheck === false)
        setInterval(()=>{
            if(playerTop < 95)
            playerTop += 0.3
            player.style.top = (playerTop) + '%'
        },10)
        else{
            clearInterval()
        }
    };
    gravityCallback()
};

// Colisão dos objetos

function boxCollision(canoCimaCollider, playerCollider, canoBaixoCollider){ 
    setInterval(()=>{
    let canoCimaAxis = canoCimaCollider.getBoundingClientRect()
    let playerAxis = playerCollider.getBoundingClientRect()
    if (canoBaixoCollider != null){
        let playerAxis = playerCollider.getBoundingClientRect()
        if (playerAxis.x + playerAxis.width >= canoCimaAxis.x &&
            playerAxis.x <= canoCimaAxis.x + canoCimaAxis.width && (
                canoCimaAxis.y + canoCimaAxis.height <= playerAxis.y ||
                canoBaixoAxis.y < playerAxis.y + playerAxis.height ) 
            ){
            console.log('encostou')

            }
        
    } else {

        if (playerAxis.x + playerAxis.width >= canoCimaAxis.x &&
            playerAxis.x <= canoCimaAxis.x + canoCimaAxis.width && 
            canoCimaAxis.height <= playerAxis.y
        ){
            console.log('encostou') 
            
        }
    }

}, 10)

};


// Toca a música
// let audio = new Audio('audio/flappysong.mp3');
// this.onload = function playMusic(){
//    let audioLoop = setInterval(()=>{
//         audio.play()
//     }, 1)
// };
