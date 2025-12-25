const game = document.querySelector(".game");
const player = document.querySelector(".player");
const scoreText = document.querySelector(".score");
const gameOverScreen = document.querySelector(".game-over");
const finalScoreText = document.getElementById("finalScore");

let isJumping = false;
let score = 0;
let gameRunning = true;

/* JUMP */
function jump() {
  if (isJumping || !gameRunning) return;

  isJumping = true;
  let up = 0;

  let jumpUp = setInterval(() => {
    if (up >= 120) {
      clearInterval(jumpUp);

      let jumpDown = setInterval(() => {
        if (up <= 0) {
          clearInterval(jumpDown);
          isJumping = false;
        }
        up -= 5;
        player.style.bottom = 40 + up + "px";
      }, 20);
    }

    up += 5;
    player.style.bottom = 40 + up + "px";
  }, 20);
}

/* CONTROLS */
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

document.addEventListener("click", jump);

/* OBSTACLES */
function createObstacle() {
  if (!gameRunning) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.right = "-30px";
  game.appendChild(obstacle);

  let pos = -30;

  let move = setInterval(() => {
    if (!gameRunning) {
      clearInterval(move);
      obstacle.remove();
      return;
    }

    pos += 5;
    obstacle.style.right = pos + "px";

    // COLLISION
    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      playerRect.left < obsRect.right &&
      playerRect.right > obsRect.left &&
      playerRect.bottom > obsRect.top
    ) {
      endGame();
    }

    if (pos > 800) {
      obstacle.remove();
      clearInterval(move);
      score++;
      scoreText.textContent = "Score: " + score;
    }
  }, 20);
}

/* GAME LOOP */
let obstacleInterval = setInterval(createObstacle, 1500);

/* END GAME */
function endGame() {
  gameRunning = false;
  clearInterval(obstacleInterval);
  finalScoreText.textContent = score;
  gameOverScreen.classList.remove("hidden");
}

/* RESTART */
function restartGame() {
  location.reload();
}
