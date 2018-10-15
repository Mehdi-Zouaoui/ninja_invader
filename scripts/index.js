

const canvas = document.getElementById("invaders");
const context = canvas.getContext("2d");

// Par défaut canvas = 300:150px
canvas.width = 480;
canvas.height = 540;

let timer;
let player;

// Chargement de l'image du sprit avant de démarrer le jeu
const spritesheet = new Image();
spritesheet.src ="../img/spritesheet.png" ;
spritesheet.onload = function(){// Fonction exécutée lorsque le navigateur a fini de charger le PNG
    player = creatPlayer();

    //Démarrage de la bouche continue
    gameloop();
}

// Gestion mécanisme de jeu
function update() {
        animatePlayer(); // Fonction qui gère l'animation du joueur
}
// Dessin
function render() {
    context.clearRect(0 , 0 , canvas.width, canvas.height)
    renderPlayer(); // Dessin du joueur
}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    // requestAnimationFrame = réccusrivité , permet de rééxécuter la function 
    timer = requestAnimationFrame(gameloop);
}

