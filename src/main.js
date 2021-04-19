/* 
JAYWALK-et PATROL
Developed by Gurkirat Saini
Completed: 4/19/20 after x Hours

Points Breakdown:
05 points - Randomizing Pedestrian Movement
05 points - Added my own Music to the Play Scene
30 points - Simultaneous 2-player Mode
            > Functional Controls 
            > Separate Score Tracking
60 points - Complete Thematic Redesign
            > Urban Environment instead of Space
            > Original Car/Pedestrian Assets
            > Original Collision Animation
            > Reorganized/Recolored the User Interface
            > Modified Controls for Players
            > Different Sound Effects

Received No Help (you can tell cuz i suck at pixel art)
*/ 

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