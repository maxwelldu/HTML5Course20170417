/**
 * Created by Administrator on 2017/6/25 0025.
 */
function Pageyard(i) {
	this.dom = null;
	this.pages = i;
	this.className = "pageyard";
	this.init();
}
Pageyard.prototype.init = function () {
	this.dom = document.createElement("button");
	this.dom.className = this.className;
	this.dom.innerHTML = this.pages;
}
