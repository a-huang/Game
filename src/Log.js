var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');
var FamousEngine = require('famous/core/FamousEngine');

var math = require('famous/math');
var Vec3 = require('famous/math/Vec3');

var physics = require('famous/physics');
var PhysicsEngine = require('famous/physics/PhysicsEngine');
var Box = physics.Box;
var Collision = physics.Collision;
var Gravity1D = physics.Gravity1D;
var Wall = physics.Wall;

/*
Creates the first box with node1, then when split
*/
function Log(node1, node2, node3){
	this.simulation = new PhysicsEngine();
	this.node = node1;
	this.node
			.setSizeMode(1,1,1)
        	.setAbsoluteSize(50, 200)
        	.setPosition(window.innerWidth / 2, window.innerHeight / 2, 0)
        	.setMountPoint(0.5, 1); 

	this.el = new DOMElement(node1);
	this.el.setProperty('backgroundImage', 'url(images/log.png)');

	//Create target line
	this.line = this.node.addChild();
    this.line
        		.setAbsoluteSize(50, 6)
        		.setSizeMode(1, 1, 1)
        		.setAlign(0.0, (randomAlign.call()/8)); //need to make function to radomize this
    
	var lineEl = new DOMElement(this.line, {
      properties: {
        'background-color': '#FF0000'
      }
    });

	//Create rope
    this.rope = this.node.addChild();
    this.rope
            	.setSizeMode(1, 1, 1)
            	.setAbsoluteSize(3,window.innerHeight)
            	.setPosition(25, 0 - window.innerHeight);
    var ropeEl = new DOMElement(this.rope, {
      properties: {
        'background-color': '#D1D1D1'
      }
    });

	this.position = new Position(this.node);
	this.position.set(window.innerWidth / 2, 0, 0, {duration:5000});
	this.myBox = createBox.call(this);
	// this.node.addComponent(updatePosition);
	FamousEngine.requestUpdate(this);

	// randomAlign() produces a number between 1 and 7
	function randomAlign(){
	    var rand = (Math.ceil((Math.random()*7)));
	    console.log(rand);
	    return rand;
	}
	//Creates initial Box
	function createBox() {
	    //attach a DOM element component to the staticNode
	    var mb = new Box({
	      mass: 10,
	      size: [50, 200, 10],
	      position: new Vec3(window.innerWidth / 2, 0, 0)
	    });

	    this.gravity = new Gravity1D(mb, {direction: Gravity1D.DOWN, strength: 500});

	    //Create constraints 
	    this.floor = new Wall({direction: Wall.UP, friction: 50});
	    this.floor.setPosition(0, window.innerHeight, 0);

	    this.rightWall = new Wall({direction: Wall.RIGHT, friction: 0});
	    this.rightWall.setPosition(0,0,0);
	    this.leftWall = new Wall({direction: Wall.LEFT, friction: 0});
	    this.leftWall.setPosition(window.innerWidth, 0, 0);

	    this.collision = new Collision([mb, this.floor, this.leftWall, this.rightWall]);

	    this.simulation.add([mb, this.gravity, this.collision]);

	    return mb;
	}	
}


	Log.prototype.onUpdate = function(time){
		this.simulation.update(time);
		var itemPosition = this.myBox.getPosition();
		this.node.setPosition(itemPosition.x, itemPosition.y, 0);
		FamousEngine.requestUpdateOnNextTick(this);
	}



FamousEngine.init();
module.exports = Log;