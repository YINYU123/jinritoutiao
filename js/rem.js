//定义设计稿尺寸
const designWidth = 750;
//定义根节点字体大小
const fontSize = 100;
function resizeFont(){
	//获取当前html的大小
	var W = document.documentElement.clientWidth;
	//设置比例
	var ratio = W / designWidth;
	//每次页面变化重新赋值
	var newFontSize = ratio < 1?fontSize*ratio:100;
	document.querySelector("html").style.fontSize = newFontSize + "px";
}
resizeFont();
window.onresize = resizeFont;
window.addEventListener("orientation", resizeFont, false);
