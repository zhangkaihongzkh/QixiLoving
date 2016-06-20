

var container = $("#content");

//获取第一个子节点
var element = container.find(":first");

//获取页面个数
var slides = element.find("li");

//获取容器尺寸
var width = container.width();
var height = container.height();

//设置li页面总宽度
element.css({
	width:(slides.length * width) + 'px',
	height: height + 'px'
});

//设置每一页的宽度
element.each(slides,function(index){
	var slide = slides.eq(index);	//获取到每一个li元素
	slide.css({
		width:width + 'px',
		height:height + 'px'
	});
});


//绑定一个事件，触发通过
$(".button").click(function(){
	element.css({
		'transition-timing-function':'linear',
		'transition-duration':'5000ms',
		'transform':'translate3d(-'+(width * 2)+'px,0px,0px)'
	});
});