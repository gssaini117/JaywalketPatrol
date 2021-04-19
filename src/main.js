/* 
JAYWALK-et PATROL
Developed by Gurkirat Saini
Completed: 4/19/20 after x hours

Points Breakdown:
10 points - Pedestrian Running Animation
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
(just in case the 10-point mod double-dips somehow)
05 points - Randomizing Pedestrian Movement
05 points - Added my own Music to the Play Scene
10 points - Randomize 4 crash sound effects

Note: The closest pedestrian is worth 10 points
      The farthest pedestrian is worth 50 points
      Hitting the pedestrian on the crosswalk costs 20 points

Received No Help (you can tell by the art)
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
let keyS, keyA, keyD;           // player 1 controls
let keyUP, keyLEFT, keyRIGHT;   // player 2 controls
let keyENTER, keyESC;           // game setting