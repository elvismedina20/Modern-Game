class Player {
  constructor(id, side) {
    this.el = document.getElementById(id);
    this.side = side;
    this.aim = 0;
    this.speed = 0;
    this.position = [this.el.offsetLeft, this.el.offsetTop];
  }

  move(dy) {
    const newY = this.el.offsetTop + dy;
    const maxY = document.getElementById("game").offsetHeight - this.el.offsetHeight;
    const clampedY = Math.max(0, Math.min(newY, maxY));
    this.el.style.top = clampedY + "px";
    this.position[1] = clampedY;
  }

  setAim(direction) {
    this.aim = direction;
  }

  fire() {
    if (ball.owner === this) {
      ball.velocity = [this.side === "left" ? 0.5 : -0.5, this.aim * 0.5];
      ball.owner = null;
    }
  }

  getPosition() {
    return [this.el.offsetLeft, this.el.offsetTop];
  }

  getSide() {
    return this.side;
  }
}
