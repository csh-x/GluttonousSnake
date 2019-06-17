(function () {
	var Tools = {
		getRandom: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	//暴露Tools给外部
	window.Tools = Tools;
})()
