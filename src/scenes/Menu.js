class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_start', './assets/start.wav');
        this.load.audio('sfx_drive', './assets/drive.wav');
        this.load.audio('sfx_crash1', './assets/crash1.wav');
        this.load.audio('sfx_crash2', './assets/crash2.wav');
        this.load.audio('sfx_crash3', './assets/crash3.wav');
        this.load.audio('sfx_crash4', './assets/crash4.wav');
        this.load.audio('sfx_scream1', './assets/scream1.wav');
        this.load.audio('sfx_scream2', './assets/scream2.wav');
        this.load.audio('sfx_scream3', './assets/scream3.wav');
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 16, 'JAYWALK-et PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        menuConfig.color = '#FF0000';
        this.add.text(game.config.width/2, game.config.height/2, 'P1: (A) and (D) to move & (S) to fire', menuConfig).setOrigin(0.5);
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
            this.sound.play('sfx_start');
            this.scene.start('playScene');    
        }
    }
}