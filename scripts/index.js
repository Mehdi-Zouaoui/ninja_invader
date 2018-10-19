

const canvas = document.getElementById("invaders");
const context = canvas.getContext("2d");

// Par défaut canvas = 300:150px
canvas.width = 480;
canvas.height = 540;

let timer;
let player;
let aliens;
const sounds = {
    invader1 : document.getElementById('invader1'),
    invader2 : document.getElementById('invader2'),
    invader3 : document.getElementById('invader3'),
    invader4 : document.getElementById('invader4'),
    invader_killed : document.getElementById('invader_killed'),
    shuriken: document.getElementById('shuriken'),
    player_death: document.getElementById('player_death'),
    theme : document.getElementById('theme')
}
const MODE_PLAYING = 1;
const MODE_GAME_OVER = 2;
const MODE_PLAYER_DEAD = 3;
let game_mode = MODE_PLAYING;
// Chargement de l'image du sprit avant de démarrer le jeu
const spritesheet = new Image();
spritesheet.src ="../img/spritesheet.png" ;
spritesheet.onload = function(){// Fonction exécutée lorsque le navigateur a fini de charger le PNG
    player = createPlayer();
    aliens = createAliens();

    //Démarrage de la boucle continue
    sounds['theme'].play();
    gameloop();
}

// Gestion mécanisme de jeu
function update() {
       switch(game_mode){
           case MODE_PLAYING:
        animatePlayer(); // Fonction qui gère l'animation du joueur
        animateAliens(); // Fonction qui gère l'animation du Alien
        break ;
       }

    }   
// Dessin
function render() {
    context.clearRect(0 , 0 , canvas.width, canvas.height)
    switch(game_mode){
    case MODE_PLAYING:
    case MODE_PLAYER_DEAD:
    renderPlayer(); // Dessin du joueur
    renderAliens(); // Dessin de l'alien
    break;
    case MODE_GAME_OVER:
    renderGameOver();
    break;
    }
    renderUI();
}

// Fonction gérant la boucle de jeu
function gameloop() {
    
    update();
    render();

    // requestAnimationFrame = réccusrivité , permet de rééxécuter la function 
    timer = requestAnimationFrame(gameloop);
}

function renderGameOver(){

    context.textAlign = 'center';
    context.fillStyle = "#0f0";
    context.font = "normal 25spx 'Press Start 2P' ,cursive";
    context.fillText('GAME OVER ', canvas.width/2, canvas.height/2);

    context.textAlign = 'rgba(142, 142, 142, 1)';
    context.font = "normal 13px 'Press Start 2P' ,cursive";
    context.fillText('PRESS F5' , canvas.width /2, canvas.height/1.8);
}
