//使用自调用函数，创建一个新的局部作用域，防止命名冲突
(function () {
	var that;//记录游戏对象
	function Game(map) {		
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}

	Game.prototype.start = function() {
	//1 把蛇和食物渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		
	//2 开始游戏的逻辑
		//2.1 让蛇移动起来
		//2.2 当蛇遇到边界游戏结束
		runSnake();
		//2.3 通过键盘控制蛇移动的方向
		bindkey();
		//2.4 当蛇遇到食物做出相应的处理
	}

	//私有函数
	//2.1 让蛇移动起来	
	/* 让蛇动 */
	function runSnake() {
		var timerId = setInterval(function () {
			//让蛇走一格
			//在定时器的function中，this是指向window对象的
			//要获取游戏对象中的蛇属性
			this.snake.move(this.food, this.map);
			this.snake.render(this.map);

			//2.2 当蛇遇到边界游戏结束
			//获取蛇头坐标
			var maxX = this.map.offsetWidth / this.snake.width;
			var maxY = this.map.offsetHeight / this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;

			if (headX < 0 || headX >= maxX) {
				alert('Game over!');
				clearInterval(timerId);
			}
			if (headY < 0 || headY >= maxY) {
				alert('Game over!');
				clearInterval(timerId);
			}
			
			
		}.bind(that), 150);
	}
	/* 让蛇动-end */

	//2.3 通过键盘控制蛇移动的方向
	/* 键盘那控制蛇移动 */
	function bindkey() {
		document.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
			//37 - left
			//38 - top
			//39 - right
			//40 - bottom
			
			switch (e.keyCode) {
				case 37:
					this.snake.direction = 'left';
					break;
				case 38:
				 	this.snake.direction = 'top';
				 	break;
				case 39:
					this.snake.direction = 'right';
					break;
				case 40:
					this.snake.direction = 'bottom';
					break;

			}
		}.bind(that), false)
	}
	/* 键盘那控制蛇移动-end */



	window.Game = Game;

})()
