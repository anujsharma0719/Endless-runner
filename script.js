const player = document.getElementById("player");
const game = document.querySelector(".game");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const ground = document.querySelector(".ground");

let isJumping = false;
let score = 0;
let gameSpeed = 5;
let lastSpeedBoost = 0;
let gameRunning = true;

/* JUMP */
document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);

function jump() {
  if (isJumping || !gameRunning) return;

  isJumping = true;
  player.classList.add("jump");

  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 500);
}

/* SCORE LOOP */
const scoreInterval = setInterval(() => {
  if (!gameRunning) return;

  score++;
  scoreText.innerText = "Score: " + score;

  // SPEED INCREASE EVERY 10 SCORE
  if (score % 10 === 0 && score !== lastSpeedBoost) {
    gameSpeed++;
    lastSpeedBoost = score;
    ground.style.animationDuration = (2 / gameSpeed) + "s";
  }
}, 200);

/* OBSTACLES */
function createObstacle() {
  if (!gameRunning) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  game.appendChild(obstacle);

  let obstacleX = 800;

  const moveInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(moveInterval);
      obstacle.remove();
      return;
    }

    obstacleX -= gameSpeed;
    obstacle.style.left = obstacleX + "px";

    // COLLISION
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      obstacleRect.left < playerRect.right &&
      obstacleRect.right > playerRect.left &&
      obstacleRect.bottom > playerRect.top &&
      obstacleRect.top < playerRect.bottom
    ) {
      gameOver();
    }

    if (obstacleX < -50) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);
}

/* OBSTACLE SPAWN LOOP */
const obstacleInterval = setInterval(() => {
  if (gameRunning) createObstacle();
}, 2000);

/* GAME OVER */
function gameOver() {
  gameRunning = false;
  finalScore.innerText = "Your Score: " + score;
  gameOverScreen.classList.remove("hidden");
}

/* RESTART */
function restartGame() {
  location.reload();
}
