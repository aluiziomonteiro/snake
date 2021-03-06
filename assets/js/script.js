let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = 1;

let apple;
let crash = new Audio('assets/sound/crash.mp3');
var crack = new Audio('assets/sound/crack.mp3');

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBg(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box);
}

function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    if(context){
        apple = new Image();
        apple.src = 'assets/img/apple.png';
        apple.onload = function(){
            context.drawImage(apple, food.x, food.y, 40, 40);
        }
    } 
}

document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for(var i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            crash.play();
            window.setTimeout(() => msnExit(), 1000);
        }
    }

    function msnExit() {
        if (confirm("Fim de Jogo. Tente outra vez!")) {
            location.reload();
        } else{
            window.location.href = "index.html";
        }  
      }

    criarBg();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        crack.play();
        score+1;
        document.getElementById('score').innerText = "Maçãs: "+score++;    
    }
  
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function play() {
    window.open("play.html");
}

var jogo = setInterval(iniciarJogo, 100);

function easy() {
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, 200);
}

function medium() {
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, 100);
}

function hard() {
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, 10);
}

function monster() {
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, -100000);
}
