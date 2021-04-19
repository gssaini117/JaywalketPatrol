class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {        
        // road
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x696969).setOrigin(0,0);
        this.add.rectangle(game.config.width/2 - borderPadding*.4, 0, borderPadding*.8, game.config.height, 0xFEDC00).setOrigin(0, 0);
        // crosswalk
        this.add.rectangle(0, game.config.height/2 - borderUISize*.4, game.config.width, borderUISize*.8, 0xFFFFFF).setOrigin(0, 0);
        // grass
        this.add.rectangle(0, 0, 2*borderUISize, game.config.height, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 2*borderUISize, 0, 2*borderUISize, game.config.height, 0x00FF00).setOrigin(0, 0);
        // sidewalk
        this.add.rectangle(2*borderUISize, 0, borderUISize, game.config.height, 0xAAAAAA).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 3*borderUISize, 0, borderUISize, game.config.height, 0xAAAAAA).setOrigin(0, 0);

        // add car1 (p1)
        this.car1 = new Car1(this, game.config.width/2 - borderUISize*3.5, borderUISize + borderPadding, 'rocket').setOrigin(0.5, 0);
        // add car2 (p2)
        this.car2 = new Car2(this, game.config.width/2 + borderUISize*3.5, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // add pedestrians (x3)
        this.ped1 = new Pedestrian(this, game.config.width + borderUISize*6, game.config.height/2 + borderUISize-16, 'spaceship', 0, 50, 10).setOrigin(0, 0);
        this.pedNeg = new Pedestrian(this, game.config.width + borderUISize*3, game.config.height/2-16, 'spaceship', 0, -20, -20).setOrigin(0,0);
        this.ped2 = new Pedestrian(this, game.config.width, game.config.height/2 - borderUISize-16, 'spaceship', 0, 10, 50).setOrigin(0,0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize scores
        this.p1Score = 0;
        this.p2Score = 0;
        // text configurations
        let scoreConfig1 = {
            fontFamily: 'Roboto',
            fontSize: '30px',
            backgroundColor: '#FF0000',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120
        }
        let scoreConfig2 = {
            fontFamily: 'Roboto',
            fontSize: '30px',
            backgroundColor: '#00FFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120
        }
        let UIConfig = {
            fontFamily: 'Roboto',
            fontSize: '42px',
            backgroundColor: '#696969',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(game.config.width/2 - (borderPadding + borderUISize)*1.5 - 120, game.config.height/2 + (borderUISize)*4, this.p1Score, scoreConfig1);
        this.scoreRight = this.add.text(game.config.width/2 + (borderPadding + borderUISize)*1.5, game.config.height/2 - (borderUISize + borderPadding)*4, this.p2Score, scoreConfig2);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        UIConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 42, 'GAME OVER', UIConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Press Enter to Restart', UIConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 42, 'or Esc for Menu', UIConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.restart();
        }

        // check key input for escape
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }
        
        // core game loop
        if (!this.gameOver) {
            this.car1.update();
            this.car2.update();
            this.ped1.update();
            this.pedNeg.update();
            this.ped2.update();
        }

        // check collisions
        if (this.checkCollision(this.car1, this.ped2)) {
            this.car1.reset();
            this.carCrash1(this.ped2);
        }
        if (this.checkCollision(this.car1, this.pedNeg)) {
            this.car1.reset();
            this.carCrash1(this.pedNeg);
        }
        if (this.checkCollision(this.car1, this.ped1)) {
            this.car1.reset();
            this.carCrash1(this.ped1);
        }
        if (this.checkCollision(this.car2, this.ped2)) {
            this.car2.reset();
            this.carCrash2(this.ped2);
        }
        if (this.checkCollision(this.car2, this.pedNeg)) {
            this.car2.reset();
            this.carCrash2(this.pedNeg);
        }
        if (this.checkCollision(this.car2, this.ped1)) {
            this.car2.reset();
            this.carCrash2(this.ped1);
        }
    }

    checkCollision(car, pedestrian) {
        // simple AABB checking
        if (car.x < pedestrian.x + pedestrian.width && 
            car.x + car.width > pedestrian.x && 
            car.y < pedestrian.y + pedestrian.height &&
            car.height + car.y > pedestrian. y) {
                return true;
        } else {
            return false;
        }
    }

    carCrash1(pedestrian) {
        // temporarily hide ped
        pedestrian.alpha = 0;
        // create crash sprite at ped's position
        let boom = this.add.sprite(pedestrian.x, pedestrian.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play crash animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          pedestrian.reset();                         // reset ped position
          pedestrian.alpha = 1;                       // make ped visible again
          boom.destroy();                       // remove crash sprite
        });     
        // score add and repaint
        this.p1Score += pedestrian.points1;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');
    }

    carCrash2(pedestrian) {
        // temporarily hide ped
        pedestrian.alpha = 0;
        // create crash sprite at ped's position
        let boom = this.add.sprite(pedestrian.x, pedestrian.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play crash animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          pedestrian.reset();                         // reset ped position
          pedestrian.alpha = 1;                       // make ped visible again
          boom.destroy();                       // remove crash sprite
        });     
        // score add and repaint
        this.p2Score += pedestrian.points2;
        this.scoreRight.text = this.p2Score;  
        this.sound.play('sfx_explosion');
    }
}