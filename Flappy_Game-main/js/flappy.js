const conteudo = document.querySelector('div[wm-flappy]')


// *** Controla criação dos obstaculos ***
function obsGenerator(){

    // Cria o objeto.
        const obstaculo = document.createElement('div')
        obstaculo.setAttribute('id','obstaculo')
        conteudo.appendChild(obstaculo)

    // Cria conjunto de canos (Divs)
        const canoCima = document.createElement('div')
        canoCima.setAttribute('id','canoCima')
        obsHeight = obstaculo.getBoundingClientRect()
        console.log(obsHeight.height)
        const canoBaixo = document.createElement('div')
        canoBaixo.setAttribute('id','canoBaixo')
        canoCima.classList.add('cano')
        canoBaixo.classList.add('cano')
        obstaculo.appendChild(canoCima)

    // Controla aleatoriedade dos canos
        let randomNum = (Math.floor(Math.random() * 13) + 4 ) * 5
        canoCima.style.height = randomNum + '%'
        let canoCimaY = canoCima.getBoundingClientRect()
        console.log('canoCimaHeight', canoCimaY.height)
        //console.log('canoCimaY', canoCimaY.top)

    // Se o cano de cima for maior que 80% da altura, cria apenas um gap
        if(randomNum < 80){
            obstaculo.appendChild(canoBaixo)
            canoBaixo.style.height =  (80 - randomNum )  + '%'
            let canoBaixoY = canoBaixo.getBoundingClientRect()
            console.log('canoBaixoHeight', canoBaixoY.height)
           // console.log('canoBaixoY', canoBaixoY.top)
        } 
    // Seta obstáculo p/ a animação.
        obstaculo.style.left = '100%'
        obsTime(obstaculo)
};


// Controla o movimento / destruição dos obstáculos
function obsTime(div){

let obsPos = 100
let obsInterval = setInterval(function obsMove(){
    obsPos = obsPos - 0.1
    div.style.left = obsPos + '%' 
    obsX = div.getBoundingClientRect()
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
    
    }, 5000)
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
            playerTop += 0.3
            player.style.top = (playerTop) + '%'
        },10)
        else{
            clearInterval(gravity)
        }
    };
    gravityCallback()
};

// Colisão dos objetos

// var boxCollision = setInterval(()=>{
//      console.log(player.y)
//  },1000)



// Toca a música
// let audio = new Audio('audio/flappysong.mp3');
// this.onload = function playMusic(){
//    let audioLoop = setInterval(()=>{
//         audio.play()
//     }, 1)
// };
