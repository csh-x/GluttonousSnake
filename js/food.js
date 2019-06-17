//所有js文件中书写代码，都是全局作用域


//自调用函数 --开启一个新的作用域，避免命名冲突
(function () {
	//这是一个局部作用域
	var position = 'absolute';
//记录上一次创建的食物，为删除做准备
	var elements = [];

	function Food(options) {
		//如果传过来了options这个参数，那就等于options，否则给他一个空对象
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.color = options.color || 'white';    //这些是食物的属性
	}


//render 渲染
Food.prototype.render = function (map) {
	//删除之前创建的食物
	remove();
	//随机设置x和y的值
	this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
	this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

/* 动态创建食物div及style */
	//动态创建div：页面上显示的食物
	var div = document.createElement('div');
	map.appendChild(div);

	elements.push(div);
	//设置div的样式
	div.style.position = position;
	div.style.left = this.x + 'px';
	div.style.top = this.y + 'px';
	div.style.width = this.width + 'px';
	div.style.height = this.height + 'px';
	div.style.backgroundColor = this.color;
/* 动态创建食物div end */
}


/* 删除食物 */
function remove() {
	for (var i = elements.length - 1; i >= 0; i--) {
		//删除div
		elements[i].parentNode.removeChild(elements[i]);
		//删除数组中的元素
		elements.splice(i, 1);
	}
}
/* 删除食物end */

//把Food构造函数让外部可以访问
window.Food = Food;

})();




//测试
// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);