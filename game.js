import { Player } from './Player.js';
import { Ball } from './Ball.js';
import { AI } from './AI.js';

const game = document.getElementById("game");
const ballEl = document.getElementById("ball");
const keysPressed = {};

let player, opponent, ball, ai;
let lastUpdate = 0;
let gameRunning = false;

function initializeGame() {
    ball = new Ball(game, ballEl);
    player = new Player("player", "left", game, ball);
    opponent = new Player("opponent", "right", game, ball);
    ai = new AI(opponent, ball, game);
    ai.setDifficulty("normal");

    ball.updateVisual();
    player.el.style.top = `${player.y}px`;
    opponent.el.style.top = `${opponent.y}px`;

    document.addEventListener("keydown", e => keysPressed[e.key.toLowerCase()] = true);
    document.addEventListener("keyup", e => keysPressed[e.key.toLowerCase()] = false);
}

function update(time) {
    if (!gameRunning) return;
    const deltaTime = time - lastUpdate;
    lastUpdate = time;

    player.update(deltaTime, keysPressed);
    ai.update(deltaTime);
    ball.update(deltaTime);

    // Add: checkCollisions(), checkScored(), etc.

    requestAnimationFrame(update);
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    lastUpdate = performance.now();
    requestAnimationFrame(update);
}

// Export startGame and initializeGame if needed
window.startGame = startGame;
window.initializeGame = initializeGame;
