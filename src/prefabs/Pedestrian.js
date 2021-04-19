// Spaceship prefab
class Pedestrian extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue1, pointValue2) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points1 = pointValue1;
        this.points2 = pointValue2;
        this.moveSpeed = 3;
    }

    update() {
        // move pedestrian left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() { // resets pedestrian
        this.x = game.config.width;
    }
}