function Ball(c){
	this.radius = Math.random()*10+10;
	this.color = "#0000ff";
	this.x = 0;
	this.y = 0;
	this.ctx = c;
	this.speed = Math.random()*4+3;
	this.draw();
}

Ball.prototype.draw = function(){
	this.ctx.save();
	this.ctx.translate(this.x, this.y);
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.arc(0,0,this.radius,0,(Math.PI * 2), true);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.restore();
};

Ball.prototype.update = function(){
	this.x+=this.speed;
	this.y;
	if(this.x>400){this.x=0}
	this.draw();
};

(function(){
	var canvas = document.getElementById("Canvas1"),
		context = canvas.getContext("2d");

	var balls = [];
	for(var i = 0; i<100; i++){
		var ball = new Ball(context);
		if(i==50){
			ball.color = "#ff0000";
		}
		ball.x = Math.random()*400;
		ball.y = Math.random()*400;
		balls.push(ball);
	}

	(function drawFrame(){
		window.requestAnimationFrame(drawFrame, canvas);
		context.clearRect(0,0, canvas.width, canvas.height);
		balls.forEach(function(e){
			e.update();
		})
	}());

})();






