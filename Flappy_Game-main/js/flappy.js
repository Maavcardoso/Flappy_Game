const conteudo = document.querySelector('div[wm-flappy]')


// *** Controla criação dos obstaculos ***

function obsGenerator(){
    // Cria conjunto de canos
        const obstaculo = document.createElement('div')

        obstaculo.setAttribute('id','obstaculo')
        conteudo.appendChild(obstaculo)

        const canoCima = document.createElement('div')
        const canoBaixo = document.createElement('div')

        canoCima.classList.add('cano')
        canoBaixo.classList.add('cano')
        obstaculo.appendChild(canoCima)

    // Controla aleatoriedade dos canos
        let randomNum = (Math.floor(Math.random() * 13) + 4 ) * 5
        canoCima.style.height = randomNum + '%'

    // Se o cano de cima for maior que 80% da altura, cria apenas um gap
        if(randomNum < 80){
            obstaculo.appendChild(canoBaixo)
            canoBaixo.style.height =  (80 - randomNum )  + '%'
        } 
    // Seta obstáculo p/ a animação.
        obstaculo.style.left = '100%'
        obsTime(obstaculo)
};


// Controla o movimento / destruição dos obstáculos
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
};

// Controla quantos obstáculos são criados
function obsGenRepeater () {
    obsGenerator()
let obsGeneratorInterval = setInterval(()=>{ 
        obsGenerator()
        
    }, 3000)
};
obsGenRepeater();

// Cria o passáro
const player = document.createElement('img')
player.setAttribute('id','player')
conteudo.appendChild(player)
document.getElementById('player').src = 'imgs/passaro.png'
playerMove(player)

// Controla movimento do jogador
function playerMove(player){

    let playerTop = 50
    let gravity;
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


    var gravityCallback = function(){
        if(playerMoveCheck === false)
        setInterval(()=>{
            if(playerTop < 95)
            playerTop += 0.5
            player.style.top = (playerTop) + '%'
        },20)
        else{
            clearInterval(gravity)
        }
    };
    gravityCallback()
};

// Colisão dos objetos


var boxCollision = setInterval(()=>{
    console.log(player.x)
},1000)



// Toca a música
// let audio = new Audio('audio/flappysong.mp3');
// this.onload = function playMusic(){
//    let audioLoop = setInterval(()=>{
//         audio.play()
//     }, 1)
// };