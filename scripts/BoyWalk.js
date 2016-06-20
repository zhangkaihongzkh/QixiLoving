/*封装男孩走路*/

function BoyWalk(){

	var container = $("#content");
	//页面可视区域
	var visualWidth = container.width();
	var visualHeight = container.height();


	//获取数据
	var getValue = function(className){
		var $elem = $('' + className +'');
		//走路的路线坐标
		return{
			height:$elem.height(),
			top:$elem.position().top
		};
	};

	//路的Y轴
	var pathY = function(){
		var data = getValue('.a_background_middle');
		return data.top + data.height/2;
	}();

	var $boy = $("#boy");
	var boyWidth  = $boy.width();
	var boyHeight = $boy.height();

	//修正小男孩的位置
	//路中间的位置减去小孩高度,25是一个修正值
	$boy.css({
		top:pathY - boyHeight +25
	});


	//动画处理//

	//暂停走路
	function pauseWalk(){
		$boy.addClass('pauseWalk');	
	}

	//恢复走路
	function restoreWalk(){
		$boy.removeClass('pauseWalk');
	}

	//css3的动作变化
	function slowWalk(){
		$boy.addClass('slowWalk');
	}


	//用transition做运动
	function startRun(options,runtime){
		var dfdPlay = $.Deferred();
		//恢复走路
		restoreWalk();
		//运动的属性
		$boy.transition(
			options,
			runtime,
			'linear',
			function(){
				dfdPlay.resolve();	//动画完成
			});
		return dfdPlay;
	}

	//开始走路
	function walkRun(time,dist,disY){
		time = time || 3000;
		//脚的动作
		slowWalk();
		//开始走路
		var d1 = startRun({
			'left':dist + 'px',
			'top':disY? disY:undefined
		},time);
		return d1;
	}
	//计算移动的距离
	function calculateDist(direction,proportion){
		return (direction == "x"? visualWidth:visualHeight) *proportion
	}


	return {
		//开始走路
		walkTo:function(time,proportionX,proportionY){
			var distX = calculateDist('x',proportionX);
			var distY = calculateDist('y',proportionY);
			return walkRun(time,distX,distY);
		},

		//停止走路
		stopWalk:function(){
			pauseWalk();
		},
		setColoer:function(value){
			$boy.css({'backgroundColor':value});
		}
	}
}