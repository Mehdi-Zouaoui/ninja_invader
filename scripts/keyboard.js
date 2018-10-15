const Keyboard = {

};

const keyMap = {
    32 : "SPACE" ,
    37 : "LEFT" ,// CODE ASCII DES TOUCHES DIRECTIONELLES UNIVERSEL ! (http://keycode.info)
    38 : "UP" ,
    39 : "RIGHT",
    40 : "DOWN" ,
    27 : "ECHAP"
};

// Gestionnaire d'evenemments
document.addEventListener("keydown" , onKey);
document.addEventListener("keyup", onKey);

function onKey(event){

    Keyboard[ keyMap[event.keyCode] ] = (event.type ==='keydown');
}
/* function onKeyDown(event){
    if(event.keyCode === 37){ Keyboard.LEFT = true;}
    if(event.keyCode === 38){ Keyboard.UP = true;}
    if(event.keyCode === 39){ Keyboard.RIGHT = true;}
    if(event.keyCode === 40){ Keyboard.DOWN = true;
    }
}
function onKeyUp(event){
    if(event.keyCode === 37){ Keyboard.LEFT = false;}
    if(event.keyCode === 38){ Keyboard.UP = false;}
    if(event.keyCode === 39){ Keyboard.RIGHT = false;}
    if(event.keyCode === 40){ Keyboard.DOWN = false;
    }*/

