

const aliensMap = [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,

    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,

    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
];


let alienExplosions = [];
let alienSoundNB = 1;
let aliensTimer = 600;
let lastAlienMovement = 0; // Instant 't' du dernier déplacement des aliens
const ALIEN_SPACE_X = 35;
const ALIEN_SPACE_Y = 28;
const NB_ALIENS_PER_LINE = 11;
const aliensSprites = {
    '40': [

        { x: 6, y: 3, width: 16, height: 16 },
        { x: 6, y: 25, width: 16, height: 16 },
    ],
    '20':
        [
            { x: 32, y: 3, width: 22, height: 16 },
            { x: 32, y: 25, width: 22, height: 16 }
        ],
    '10':
        [
            { x: 60, y: 3, width: 24, height: 16 },
            { x: 60, y: 25, width: 24, height: 16 }
        ],
};
function createAliens() {
    const aliens = [];

    for (let i = 0, line = 0; i < aliensMap.length; i++) {
        if (i % NB_ALIENS_PER_LINE === 0) {
            line++;
        }


        let alienWidth = aliensSprites[aliensMap[i]][0].width;
        let alienHeight = aliensSprites[aliensMap[i]][0].height;
        aliens.push({
            x: 12 + i % NB_ALIENS_PER_LINE * ALIEN_SPACE_X,
            y: 100 + line * ALIEN_SPACE_Y,
            width: alienWidth,
            height: alienHeight,
            points: aliensMap[i],
            direction: 1,
            spriteIndex: 0
        })
    }
    return aliens;

}

function animateAliens() {

    if (Date.now() - lastAlienMovement > aliensTimer) {
        lastAlienMovement = Date.now(); // Mise à jour de l'instant du denrier mouvement du joueur à maintenant

      //  sounds["invader" + alienSoundNB].play();
        alienSoundNB++;
        if (alienSoundNB > 4) {
            alienSoundNB = 1;
        }
        for(let i = 0; i<aliens.length; i++){

            if(Math.random() > 0.98 ){
                createAlienShot(aliens[i]);
            }
        }
        // Récupération du X de l'alien le plus à droite ( et à gauche)
        let extremeDownAlien = Math.max(...aliens.map(a => a.y));
        if (extremeDownAlien + 16 >= player.y) {
            player.lives = 0;
            sounds['player_death'].play();
            sounds['theme'].pause();
            game_mode = MODE_GAME_OVER;
        }
        let extremeRightAlien = Math.max(...aliens.map(a => a.x)) + ALIEN_SPACE_X;
        let extremeLeftAlien = Math.min(...aliens.map(a => a.x));



        // Parcours du tableau d'aliens pour mise à jour
        for (let i = 0; i < aliens.length; i++) {

            if (
                extremeRightAlien > canvas.width && aliens[i].direction === 1 ||
                extremeLeftAlien <= 0 && aliens[i].direction === -1
            ) {
                aliens[i].direction *= -1;
                aliens[i].y += 22;

            }
            else {
                aliens[i].x += 12 * aliens[i].direction;
            }
            aliens[i].spriteIndex = (aliens[i].spriteIndex === 0) ? 1 : 0;
            /*if(aliens[i].spriteIndex === 0){
                aliens[i].spriteIndex = 1;
            } else aliens[i].spriteIndex =0;
        }*/
        }
    }
    // Vérification si un alien se prend un tri de player.bullet
    if (player.bullet !== null) {
        for (let i = 0; i < aliens.length; i++) {
            if (
                player.bullet.x > aliens[i].x &&
                player.bullet.x <= aliens[i].x + aliens[i].width &&
                player.bullet.y > aliens[i].y &&
                player.bullet.y <= aliens[i].y + aliens[i].height) {
                // Collision :
                // Augmentation du score du joueur
                player.score += aliens[i].points;
                player.bullet = null;
                createExplosion(aliens[i]);
                //Son
                sounds['invader_killed'].play();
                // Augmentation de la vitesse générale du joueur
                aliensTimer -= 15;
                if (aliensTimer < 75) {
                    aliensTimer = 75;
                }
                //Suppression de l'alien du tableau
                aliens.splice(i, 1);
                break;
            }


        }
    }
    for (let i = 0; i < alienExplosions.length; i++) {
        if (Date.now() - alienExplosions[i].dateCreated > 100) {
            alienExplosions.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < alienShots.length; i++) {
        alienShots[i].y += alienShots[i].speed;

        if (alienShots[i].y > canvas.height) {
            alienShots.splice(i, 1);
            i--;
        }
        else if(
            alienShots[i].x > player.x &&
            alienShots[i].x + alienShots[i].width < player.x + player.sprite.width &&
            alienShots[i].y+ alienShots[i].height > player.y &&
            alienShots[i].y < player.y + player.sprite.height
        ){
            player.lives --;
            if(player.lives === 0){
                sounds['theme'].pause();
                game_mode = MODE_GAME_OVER;
               
                break;
            }
            alienShots.length = 0 ;
            player.bullet = null;

            sounds['player_death'].play();
            game_mode = MODE_PLAYER_DEAD;
            setTimeout(() => {
                player.x = 100;
                game_mode = MODE_PLAYING;
            },1000);
        }
    }
    
}// -- fin du mouvement des aliens





function renderAliens() {
    for (let i = 0; i < aliens.length; i++) {

        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;
        context.drawImage(
            spritesheet,


            aliensSprites[points][spriteIndex].x,
            aliensSprites[points][spriteIndex].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,

            aliens[i].x,
            aliens[i].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height

        );
    }
    for (let i = 0; i < alienExplosions.length; i++) {
        context.drawImage(
            spritesheet,


            alienExplosions[i].sprite.x,
            alienExplosions[i].sprite.y,
            alienExplosions[i].sprite.width,
            alienExplosions[i].sprite.height,

            alienExplosions[i].x,
            alienExplosions[i].y,
            alienExplosions[i].sprite.width,
            alienExplosions[i].sprite.height

        );
    }
    for (let i = 0; i< alienShots.length; i++) {
        context.fillStyle = "fff";
        context.fillRect(alienShots[i].x, alienShots[i].y, alienShots[i].width, alienShots[i].height);


    }
}
    // Fonction qui crée un objet représentant une explosion, à paritr d'un alien
    function createExplosion(alien) {
        alienExplosions.push({
            x: alien.x,
            y: alien.y,
            sprite: {
                x: 88,
                y: 25,
                width: 26,
                height: 16
            },
            dateCreated: Date.now()
        });
    }
    let alienShots = [];
    function createAlienShot(alien) {
        //SON
        // sounds['shuriken'].play();
        //Ajout d'un shot alien dans le tableau correspondant 
        alienShots.push({
            x: alien.x + alien.width / 2,
            y: alien.y + alien.height,
            width : 4,
            height: 10,
            speed: 5
        });
    }




