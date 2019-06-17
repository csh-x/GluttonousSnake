//子调用函数，开启一个新的局部作用域，防止命名冲突
(function () {
	var position = 'absolute';
	//记录之前创建的蛇
	var elements = [];
	/* 定义蛇的构造函数及属性 */
	function Snake(options) {
		//防止不传参数报错
		options = options || {};
		//蛇节的大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		//蛇移动方向
		this.direction = options.direction || 'right';
		//蛇的身体
		this.body = [
			{x: 3,y: 2, color: 'red'},
			{x: 2,y: 2, color: 'gold'},
			{x: 1,y: 2, color: 'gold'},
		];
	}
	/* 定义蛇的构造函数及属性-end */


	/* 将蛇渲染到地图上 */
	Snake.prototype.render = function (map) {
		//删除之前创建的蛇
		remove();
		//把每一个蛇节渲染到地图上
		for (var i = 0, len = this.body.length; i < len; i++) {
			//object存储遍历出来的蛇节
			var object = this.body[i];

			var div = document.createElement('div');
			map.appendChild(div);

			//记录当前蛇
			elements.push(div);

			//设置样式
			div.style.position = position;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.left = object.x * this.width + 'px';
			div.style.top = object.y * this.height + 'px';
			div.style.backgroundColor = object.color;
		}	
	}
	/* 将蛇渲染到地图上--end */


	/* 删除蛇的方法 */
	function remove() {
		for (var i = elements.length - 1; i >= 0; i--) {
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i, 1);
		}
	}


	/* 删除蛇的方法--end */


	/* 给蛇添加一个move方法 */
	Snake.prototype.move = function (food,map) {
		//控制蛇的身体移动（当前蛇节到上一个蛇节位置）
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//控制蛇头的移动
		var head = this.body[0];

		switch(this.direction) {
			case 'right': head.x += 1;
			break;
			case 'left': head.x -= 1;
			break;
			case 'top': head.y -= 1;
			break;
			case 'bottom': head.y += 1;
			break;

		}

		//2.4 判断蛇头是否和食物的坐标重合
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if (headX === food.x && headY === food.y) {
			//给蛇添加一个蛇节
			//获取蛇的最后一个蛇节
			var last = this.body[this.body.length - 1];
			/*this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			});*/
			var obj = {};
			extend(last, obj);
			this.body.push(obj);






			//随机生成一个新的食物
			food.render(map);
		}
		
	}
	/* 给蛇添加一个move方法-end */


	function extend(parent, child) {
		for (var key in parent) {
			if (child[key]) {
				continue;
			}
			child[key] = parent[key];
		}

	}
		








	//暴露构造函数给外部
	window.Snake = Snake;

})()

//测试
// var map = document.getElementById('map');
// var snake = new Snake();
// snake.render(map);