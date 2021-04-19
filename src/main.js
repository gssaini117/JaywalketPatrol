let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyW, keyA, keyD;           // player 1 controls
let keyUP, keyLEFT, keyRIGHT;   // player 2 controls
let keyENTER, keyESC;           // game setting