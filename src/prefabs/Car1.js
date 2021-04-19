// Car 1 Prefab
class Car1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add car sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if (keyA.isDown && this.x >= borderUISize*3 + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width/2 - borderPadding - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyS) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }

        // if fired, move down
        if(this.isFiring) {
            this.y += this.moveSpeed;
        }

        // reset on miss
        if(this.y >= game.config.height - (borderUISize * 3 + borderPadding)) {
            this.isFiring = false;
            this.y = borderUISize + borderPadding;
        }
    }

    reset() { // resets car
        this.isFiring = false;
        this.y = borderUISize + borderPadding;
    }
}