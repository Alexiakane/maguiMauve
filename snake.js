//minuteur
"use strict";
// -------------
function launch_count_down() {
    let count_down_div = document.getElementById("count_down_div");
    // -----------
    // 1- le délai
    let total_delay = 30 * 20 * 1000; // toutes les 10 MINUTES
    //let total_delay = 30 * 60 * 1000; // toutes les 30 MINUTES
    // -----------
    // 2- Compte à rebours
    let count_down_delay = 1000 * 1; // affichage toutes les 1 secondes
    let count_down = 0;
    count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
    let count_Interval = window.setInterval(function () {
        count_down += count_down_delay;
        count_down_div.textContent = heures_minutes_secondes((total_delay - count_down) / 1000);
        if (count_down >= total_delay) { count_down = 0; }
    }, count_down_delay);
    // -----------
    // 3- A LA FIN du compte à rebours
    setTimeout(function () {
        // on STOPPE
        clearInterval(count_Interval);
        // ICI : ACTION(S) à effectuer à la FIN du compte à rebours
        // ex : affichage
        count_down_div.textContent = 'C\'est fini !';
        // ....
    }, total_delay);
    // -----------
}
// -------------
function heures_minutes_secondes(secondes) {
    let temps = new Date();
    temps.setTime(secondes * 1000);
    if (secondes > 60 * 60) // supérieur à 1 heure
    {
        return (temps.getHours() - 1).toString().padStart(2, '0') + ":" + temps.getMinutes().toString().padStart(2, '0') + ":" + temps.getSeconds().toString().padStart(2, '0');
    } else {
        return temps.getMinutes().toString().padStart(2, '0') + ":" + temps.getSeconds().toString().padStart(2, '0');
    }
}
// -------------
// Déclenchement au click sur bouton
document.getElementById("start_timer").addEventListener('click', function () {
    launch_count_down();
    this.style.display = 'none'; // on masque le bouton
});
// -------------
// Déclenchement au chargment de page
/*
document.addEventListener('DOMContentLoaded', function(event) {
  launch_count_down();
});
*/
// -------------

//jeu du snake
let snake = document.getElementById("snake");
window.onload = function () {
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30; // en pixels
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const widthInBlocks = canvasWidth / blockSize;
    const heightInBlocks = canvasHeight / blockSize;
    const centreX = canvasWidth / 2;
    const centreY = canvasHeight / 2;
    let delay; // en millisecondes
    let snakee;
    let applee;
    let score;
    let timeout;

    init();

    function init() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid hotpink";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#efb3e1";
        snake.appendChild(canvas);
        launch();
    }

    function launch() {
        snakee = new Snake(
            [
                [6, 4],
                [5, 4],
                [4, 4],
                [3, 4],
                [2, 4]
            ],
            "right"
        );
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeout);
        delay = 100;
        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee));
                if (score % 5 == 0) {
                    speedUp();
                }
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "red";
        ctx.lineWidth = "5";
        ctx.strokeText("Game Over", centreX, centreY - 180);
        ctx.fillText("Game Over", centreX, centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText(
            "Appuyer sur la touche espace pour rejouer",
            centreX,
            centreY - 120
        );
        ctx.fillText(
            "Appuyer sur la touche espace pour rejouer",
            centreX,
            centreY - 120
        );
        ctx.restore();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "purple";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    function speedUp() {
        delay /= 1.1;
    }

    //Fonction de dessin d'un block du serpent
    function drawBlock(ctx, position) {
        const x = position[0] * blockSize;
        const y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    //Fonction constructrice du serpent
    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#e4ff00";
            for (let i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance = function () {
            const nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw "Invalid direction";
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple) this.body.pop();
            else this.ateApple = false;
        };

        this.setDirection = function (newDirection) {
            let allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw "Invalid direction";
            }
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            let wallCollision = false;
            let snakeCollision = false;
            const head = this.body[0];
            const rest = this.body.slice(1);
            const snakeX = head[0];
            const snakeY = head[1];
            const minX = 0;
            const minY = 0;
            const maxX = widthInBlocks - 1;
            const maxY = heightInBlocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }
            for (let i = 0; i < rest.length; i++) {
                if (snakeX == rest[i][0] && snakeY == rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };
        this.isEatingApple = function (appleToEat) {
            const head = this.body[0];
            if (
                head[0] === appleToEat.position[0] &&
                head[1] === appleToEat.position[1]
            )
                return true;
            else return false;
        };
    }

    //Fonction constructrice de la pomme
    function Apple(position) {
        this.position = position;
        this.draw = function () {
            const radius = blockSize / 2;
            const x = this.position[0] * blockSize + radius;
            const y = this.position[1] * blockSize + radius;
            ctx.save();
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPosition = function () {
            const newX = Math.round(Math.random() * (widthInBlocks - 1));
            const newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };
        this.isOnSnake = function (snakeToCheck) {
            let isOnSnake = false;
            for (let i = 0; i < snakeToCheck.body.length; i++) {
                if (
                    this.position[0] === snakeToCheck.body[i][0] &&
                    this.position[1] === snakeToCheck.body[i][1]
                ) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }

    //Gestion des touches du clavier
    /*
    document.onkeydown = function handleKeyDown(e){
      const key = e.keyCode;
      let newDirection;
      switch(key){
        case 37:
          newDirection = "left";
          break;
        case 38:
          newDirection = "up";
          break;
        case 39:
          newDirection = "right";
          break;
        case 40:
          newDirection = "down";
          break;
        case 32:
          restart();
          return;
        default:
          return;
      }
      snakee.setDirection(newDirection);
    }
    */

    const map = {}; // You could also use an array
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == "keydown";
        let newDirection;
        console.log(map);
        if (map[37]) {
            newDirection = "left";
        } else if (map[38]) {
            newDirection = "up";
        } else if (map[39]) {
            newDirection = "right";
        } else if (map[40]) {
            newDirection = "down";
        } else if (map[32]) {
            launch();
        }
        snakee.setDirection(newDirection);
    };

    window.addEventListener("keydown", onkeyup);
    window.addEventListener("keyup", onkeydown);
};
