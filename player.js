export class Player {
    constructor(id, side, game, ball) {
        this.el = document.getElementById(id);
        this.side = side;
        this.height = 100;
        this.width = 15;
        this.speed = 6;
        this.y = (game.clientHeight - this.height) / 2;
        this.el.style.top = `${this.y}px`;
        this.movingUp = false;
        this.movingDown = false;
        this.game = game;
        this.ball = ball;
    }

    getCenterY() {
        return this.y + this.height / 2;
    }

    move(dy) {
        this.y = Math.max(0, Math.min(this.y + dy, this.game.clientHeight - this.height));
        this.el.style.top = `${this.y}px`;
    }

    update(deltaTime, keysPressed) {
        let dy = 0;
        if (this.side === "left") {
            if (keysPressed['w']) dy = -this.speed;
            if (keysPressed['s']) dy = this.speed;
        }
        this.move(dy);
    }

    fire() {
        if (this.ball.owner === this) {
            const direction = this.side === "left" ? 1 : -1;
            this.ball.velocity = [direction * this.ball.baseSpeed, (Math.random() - 0.5) * 5];
            this.ball.owner = null;
        }
    }
}
