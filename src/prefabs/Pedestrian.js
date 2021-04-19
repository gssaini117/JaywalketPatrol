// Pedestrian prefab
class Pedestrian extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, dir, pointValue1, pointValue2) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points1 = pointValue1;
        this.points2 = pointValue2;
        this.moveSpeed = 2;
        if (dir >= 50)
            this.direction = true;
        else
            this.direction = false;
    }

    update() {
        if (this.direction) {
            this.flipX = false;
            // move pedestrian left
            this.x -= this.moveSpeed;
            //wrap around from left edge to right edge
            if(this.x <= 0) {
                this.x = game.config.width;
            }
        } else {
            this.flipX = true;
            // move pedestrian right
            this.x += this.moveSpeed;
            //wrap around from right edge to left edge
            if(this.x >= game.config.width) {
                this.x = 0;
            }
        }
    }

    reset() { // resets pedestrian
        if (this.direction)
            this.x = game.config.width;
        else
            this.x = 0;
    }
}