class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      }

    create() {
        let menuConfig = {
            fontFamily: 'Roboto',
            fontSize: '64px',
            color: '#696969',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'JAYWALK-et PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        menuConfig.color = '#FF0000';
        this.add.text(game.config.width/2, game.config.height/2, 'P1: (A) and (D) to move & (W) to fire', menuConfig).setOrigin(0.5);
        menuConfig.color = '#00FFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'P2: (←) and (→) to move & (↑) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 2*(borderUISize + borderPadding), 'Press Enter to Begin!', menuConfig).setOrigin(0.5);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            // start game
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}