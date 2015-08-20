var DOMElement = require('famous/dom-renderables/DOMElement');

function Log(node){
	this.node = node;
	this.el = new DOMElement(node);
	this.el.setProperty('backgroundImage', 'url(images/log.png)');
}

module.exports = Log;