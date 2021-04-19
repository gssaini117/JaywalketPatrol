class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('car1', './assets/Car1.png');
        this.load.image('car2', './assets/Car2.png');
        this.load.spritesheet('pedestrian', './assets/Pedestrian.png', {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 3});
        this.load.spritesheet('explosion1', './assets/Explosion1.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/Explosion2.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 9});
        this.load.audio('ost', './assets/NotOnMyWatch.wav');
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
        this.car1 = new Car1(this, game.config.width/2 - borderUISize*3.5, borderUISize + borderPadding - 64, 'car1').setOrigin(0.5, 0);
        // add car2 (p2)
        this.car2 = new Car2(this, game.config.width/2 + borderUISize*3.5, game.config.height - borderUISize - borderPadding, 'car2').setOrigin(0.5, 0);
        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // add pedestrians (x3) + rng
        this.ped1 = new Pedestrian(this, game.config.width, game.config.height/2 + borderUISize-8, 'pedestrian', 0, Math.random()*100, 50, 10).setOrigin(0, 0);
        this.pedNeg = new Pedestrian(this, game.config.width, game.config.height/2-8, 'pedestrian', 0, Math.random()*100, -20, -20).setOrigin(0,0);
        this.ped2 = new Pedestrian(this, game.config.width, game.config.height/2 - borderUISize-8, 'pedestrian', 0, Math.random()*100, 10, 50).setOrigin(0,0);

        // animations config
        this.anims.create({
            key: 'explode1',
            frames: this.anims.generateFrameNumbers('explosion1', {start: 0, end: 9, first: 0}),
            frameRate: 16
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', {start: 0, end: 9, first: 0}),
            frameRate: 16
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('pedestrian', {start: 0, end: 3, first: 0}),
            framerate: 20,
            repeat: true
        }) 

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

        this.sound.play('ost');

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
            this.ped1.anims.play('walk', true);
            this.ped2.anims.play('walk', true);
            this.pedNeg.anims.play('walk', true);
        }

        // check collisions
        if (this.checkCollision(this.car1, this.ped2)) {
            this.carCrash1(this.ped2, this.car1);
            this.car1.reset();
        }
        if (this.checkCollision(this.car1, this.pedNeg)) {
            this.carCrash1(this.pedNeg, this.car1);
            this.car1.reset();
        }
        if (this.checkCollision(this.car1, this.ped1)) {
            this.carCrash1(this.ped1, this.car1);
            this.car1.reset();
        }
        if (this.checkCollision(this.car2, this.ped2)) {
            this.carCrash2(this.ped2, this.car2);
            this.car2.reset();
        }
        if (this.checkCollision(this.car2, this.pedNeg)) {
            this.carCrash2(this.pedNeg, this.car2);
            this.car2.reset();
        }
        if (this.checkCollision(this.car2, this.ped1)) {
            this.carCrash2(this.ped1, this.car2);
            this.car2.reset();
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

    carCrash1(pedestrian, car) {
        // temporarily hide ped
        pedestrian.alpha = 0;
        // create crash sprite at ped's position
        let boom = this.add.sprite(car.x-16, car.y, 'explosion1').setOrigin(0, 0);
        boom.anims.play('explode1');             // play crash animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          pedestrian.reset();                         // reset ped position
          pedestrian.alpha = 1;                       // make ped visible again
          boom.destroy();                       // remove crash sprite
        });     
        // score add and repaint
        this.p1Score += pedestrian.points1;
        this.scoreLeft.text = this.p1Score;  
        this.generateSounds();
    }

    carCrash2(pedestrian, car) {
        // temporarily hide ped
        pedestrian.alpha = 0;
        // create crash sprite at ped's position
        let boom = this.add.sprite(car.x-16, car.y, 'explosion2').setOrigin(0, 0);
        boom.anims.play('explode2');             // play crash animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          pedestrian.reset();                         // reset ped position
          pedestrian.alpha = 1;                       // make ped visible again
          boom.destroy();                       // remove crash sprite
        });     
        // score add and repaint
        this.p2Score += pedestrian.points2;
        this.scoreRight.text = this.p2Score;  
        this.generateSounds();
    }

    generateSounds() { 
        let crash = Math.random() * 100;
        let scream = Math.random() * 100;

        if (crash >= 75) 
            this.sound.play('sfx_crash1');
        else if (crash >= 50)
            this.sound.play('sfx_crash2');
        else if (crash >= 25)
            this.sound.play('sfx_crash3');
        else
            this.sound.play('sfx_crash4');
    }
}