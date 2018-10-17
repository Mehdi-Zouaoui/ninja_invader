const bulletsprite = new Image();
bulletsprite.src = "../img/shuriken.png";

function createPlayer() {
    // Création d'un objet littéral JS représentant le joueur et ses propriétés 
    const player = {
        x: 100,
        y: 450,
        speed: 6,
        lives: 3,
        score : 0,
        sprite: {
            img: spritesheet,
            offsetX: 88,
            offsetY: 3,
            width: 26,
            height: 16

        },
        bullet: null
    };
    // brackets []
    // curly brackets{}
    return player;
}


function animatePlayer() {
    if (Keyboard.RIGHT) {
        player.x += player.speed;
    }
    if (Keyboard.LEFT) {
        player.x -= player.speed;
    }

    // Gestion du débordement d'écran du joueur
    if (player.x < 0) {
        player.x = 0;
    }
    else if (player.x + player.sprite.width > canvas.width) {
        player.x = canvas.width - player.sprite.width;
    }
    //Si le joueur tire
    if (Keyboard.SPACE) {
        if (player.bullet === null) {
            player.bullet = {
                x: player.x + player.sprite.width / 2 - 2,
                y: player.y,
                img: bulletsprite,
                width: 50,
                height: 50,
                speed: 5,
                rotation: Math.PI / 2
            };
        }

    }
    // Etat d'avancement du shoot du joueur
    if (player.bullet !== null) {
        player.bullet.y -= player.bullet.speed;
        //player.bullet.x -= player.bullet.rotation;

        if (player.bullet.y + player.bullet.height < 0) {
            player.bullet = null;
        }
    }
}

function renderPlayer() {
    // Voir si on rentre dans la boucle console.log('ho')
    // Dessin du joueur à ses coordonnées
    context.drawImage(
        player.sprite.img,
        player.sprite.offsetX,
        player.sprite.offsetY,
        player.sprite.width,
        player.sprite.height,


        player.x,
        player.y,
        player.sprite.width,
        player.sprite.height

    );

    // Dessin du shoot joueur
    if (player.bullet !== null) {
        // context.fillStyle = player.bullet.color;
        // context.save();
         //context.translate( player.bullet.x + player.bullet.width/2 , player.bullet.y + player.bullet.height/2);
        //context.rotate(player.bullet.rotation);
        context.drawImage(
            player.bullet.img,
            //-player.bullet.x + player.bullet.width/2,
            //-player.bullet.y + player.bullet.height/2,
            player.bullet.x,
            player.bullet.y,
            player.bullet.width,
            player.bullet.height,


        )
        // context.restore();
    }
}