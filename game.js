var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2; 
var ballRadius = 10; 
var color = getRandomColor();
var drawTime = 10;

var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightButtonPressed = false;
var leftButtonPressed = false;

var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x:0, y: 0};
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) { 
	if(e.keyCode == 39) { 
		rightButtonPressed = true;
	}
	else if(e.keyCode == 37) {
		leftButtonPressed = true;
	}
}

function keyUpHandler(e) { 
	if(e.keyCode == 39) { 
		rightButtonPressed = false;
	}
	else if(e.keyCode == 37) {
		leftButtonPressed = false;
	}
}

function getRandomColor() { 
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i=0; i<6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height); 
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();

	x+=dx;
	y+=dy;

	if(x +dx > canvas.width-ballRadius || x + dx < ballRadius) {
	 	dx = -dx;
	 	color = getRandomColor();
	} 

	if(y + dy < ballRadius) {
	 	dy = -dy;
	 	color = getRandomColor();
	} 
	else if(y + dy > canvas.height-ballRadius) { 
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			//alert("Game Over");
			document.location.reload();
		}
	}

	if(rightButtonPressed && paddleX < canvas.width-paddleWidth){
		paddleX += 7;
	}
	else if(leftButtonPressed && paddleX > 0){
		paddleX -= 7;
	}
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
		}
	}
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}


function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}


setInterval(draw, 10);
