var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');

function Log(node){
	this.node = node;
	this.node
			.setSizeMode(1,1,1)
        	.setAbsoluteSize(50, 200)
        	.setPosition(window.innerWidth / 2, window.innerHeight / 2, 0)
        	.setMountPoint(0.5, 1); 

	this.el = new DOMElement(node);
	this.el.setProperty('backgroundImage', 'url(images/log.png)');

	//Create target line
	this.line = this.node.addChild();
    this.line
        .setAbsoluteSize(50, 6)
        .setSizeMode(1, 1, 1)
        .setAlign(0.0, (randomAlign.call()/8)); //need to make function to radomize this
    var targetLine = new DOMElement(this.line, {
      properties: {
        'background-color': '#FF0000'
      },
      content: ' '
    });

	this.position = new Position(this.node);
	this.position.set(window.innerWidth / 2, 0, 0, {duration:5000});
}

// randomAlign() produces a number between 1 and 7
function randomAlign(){
    var rand = (Math.ceil((Math.random()*7)));
    console.log(rand);
    return rand;
}

module.exports = Log;